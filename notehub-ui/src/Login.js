import './Login.css';
import AppContext from './AppContext'
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useContext } from 'react' //en çok kullanılanlar
import axios from 'axios'

function Login() {
    const history = useHistory();//tarayıcı geçmişi gibi
    const ctx = useContext(AppContext); // providerda tanımladıklarıma errişmek için.
    const query = new URLSearchParams(useLocation().search);
    const qlogout = query.get("logout");//queryden değer okuma
    useEffect(() => {
        //login bileşeni render/update olduğundan çalışacaklar
        //ajax istekleri burada yapılır.
        if (qlogout === "success") {
            toast("You have logout successfuly");
        }
    }, [qlogout]);//burdaki useEffect qlogout parametresinin değişmesine bağlı olarak çalışır.

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [errors, setErrors] = useState([]);

    const handleSubmit = function (e) {
        setErrors([]);//her form gönderildiğinde hataları sıfırla
        e.preventDefault();
        axios.post("https://localhost:5001/api/Account/Login", {
            username: email,
            password: password
        })
            .then(function (response) {
                if(rememberMe){//localstorage ve sessionstorage erişim js ile
                    localStorage["username"] = email;
                    localStorage["token"] = response.data.token;
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("username");
                }
                else{
                    sessionStorage["username"] = email;
                    sessionStorage["token"] = response.data.token;
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                }
                ctx.setToken(response.data.token);
                ctx.setIsLoggedIn(true);
                history.push("/");
            })
            .catch(function (error) {
                if (error.response.data.errors) {//böyle bi prop varsa
                    const messages = [];
                    for (const key in error.response.data.errors) {
                        messages.push(...error.response.data.errors[key]);
                    }
                    setErrors(messages);
                }
            })
    };

    return (
        <Card className="card-login">
            <Card.Body className="p-sm-4">
                <ToastContainer />
                <h1 className="text-center">Login</h1>
                {/* {email} {password} {rememberMe ? "remember" : "dont remember"} */}
                <Alert variant="danger" className={errors.length == 0 ? "d-none" : ""}>
                    {errors.join(' ')}
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onInput={(e) => setEmail(e.target.value)} required />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onInput={(e) => setPassword(e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <div className="text-center mt-3">
                    <Link to="/register">Register as a new user</Link>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Login;
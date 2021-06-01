import './Login.css';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import axios from 'axios'

function Login() {
    var query = new URLSearchParams(useLocation().search);
    var qlogout = query.get("logout");//queryden değer okuma
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

    const handleSubmit = function(e){
        e.preventDefault();
        axios.post("https://localhost:5001/api/Account/Login",{
            username: email,
            password: password
        })
        .then(function(response){
            console.log(response);
        })
        .catch(function(error){
            const data = error.response.data;
            const messages = [];
            for (const key in data){
                messages.push(...data[key]);
            }
            console.log(messages.join(' '));
        })
    };

    return (
        <Card className="card-login">
            <Card.Body className="p-sm-4">
                <ToastContainer />
                <h1 className="text-center">Login</h1>
                {/* {email} {password} {rememberMe ? "remember" : "dont remember"} */}
                <Alert variant="danger">
                    Invalid e-mail or password.
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
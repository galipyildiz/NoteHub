import React, { useState } from "react";
import AppContext from './AppContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import './App.css';
// import Button from 'react-bootstrap/Button'
import Home from './Home';
import Register from './Register';
import Login from './Login'
import Logout from './Logout'



function App() {
  const tokenString = sessionStorage["token"] || localStorage["token"] || null;
  const [isLoggedIn, setIsLoggedIn] = useState(tokenString != null);  
  const [token, setToken] = useState(tokenString);//Destructuring assignment => [abc,edf]
  const [username, setUsername] = useState(sessionStorage["username"] || localStorage["username"] || null);
  return (
    /* <h1>Merhaba Dünya!</h1>
    <Button variant="primary" className="mr-4">Benim Butonum</Button>
    <Button variant="danger">Benim Butonum</Button>
    <button class="btn btn-success ml-4">Butonum</button> */
    <AppContext.Provider value = {{ token, setToken, isLoggedIn, setIsLoggedIn, username, setUsername}} >
      <Router>
        <Switch>
          <Route path="/register" >
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/" >
            {isLoggedIn ? <Home /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;

import React, { useState } from "react";
import AppContext from './AppContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  matchPath
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
// import Button from 'react-bootstrap/Button'
import Home from './Home';
import Register from './Register';
import Login from './Login'
import Logout from './Logout'


function App() {
  let isLoggedIn = true;// TODO: context'in içine kat
  //Destructuring assignment
  const [token, setToken] = useState("qwerty");
  return (
    /* <h1>Merhaba Dünya!</h1>
    <Button variant="primary" className="mr-4">Benim Butonum</Button>
    <Button variant="danger">Benim Butonum</Button>
    <button class="btn btn-success ml-4">Butonum</button> */
    <AppContext.Provider value = {{ token, setToken}} >
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
            {isLoggedIn ? <Home /> : <div>önce giriş yap</div>}
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
// import Button from 'react-bootstrap/Button'
import Home from './Home';
import Register from './Register';
import Login from './Login'
import Logout from './Logout'


function App() {
  return (
      /* <h1>Merhaba Dünya!</h1>
      <Button variant="primary" className="mr-4">Benim Butonum</Button>
      <Button variant="danger">Benim Butonum</Button>
      <button class="btn btn-success ml-4">Butonum</button> */
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
              <Home />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;

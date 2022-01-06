import React from "react";
import { Switch, NavLink } from "react-router-dom";
import "./App.css";

import Public from "./Routes/Public";
import Private from "./Routes/Private";
import Admin from "./Pages/Admin/Admin";
import Queue from "./Pages/Admin/Queue";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Ocherds from "./Pages/Ocherds/Ocherd";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Login/Login";

import useToken from "./Hooks/useToken";

function App() {
  const [token] = useToken();
  const [setToken] = useToken(true);

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <NavLink className="link" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/ocherds">
              Queue
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/contact">
              Contact
            </NavLink>
          </li>
          <li>
            {!token && (
              <NavLink className="link" to="/login">
                Login
              </NavLink>
            )}
          </li>
        </ul>
        <button
          className="logOut"
          title="click to log out"
          onClick={() => setToken(false)}>
          Log Out
        </button>
      </nav>

      <Switch>
        <Public path="/" component={Home} exact />
        <Public path="/about" component={About} exact />
        <Private path="/ocherds" component={Ocherds} exact />
        <Private path="/admin" component={Admin} exact />
        <Private path="/queue" component={Queue} exact />
        <Public path="/contact" component={Contact} exact />
        <Public path="/login" component={Login} exact />
      </Switch>
    </>
  );
}

export default App;

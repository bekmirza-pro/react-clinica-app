import React from "react";
import useToken from "../../Hooks/useToken";
import "../Login/Login.css";
import { useHistory } from "react-router-dom";

function Login() {
  const [setToken] = useToken(true);
  const history = useHistory();

  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    const { username, email, password } = evt.target.elements;
    fetch("http://localhost:9000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
      }),
    })
      .then((res) => res.json())
      .then((data) => setToken(data.token));
  };
  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    const { username, password } = evt.target.elements;
    fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value.trim(),
        password: password.value.trim(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.token);
        if (data.isAdmin) {
          //   agar isAdmin true bolsa demak bu admin shunga admin pagega otadi;
          history.push("/admin");
        } else {
          history.push("/");
        }
      });
  };
  return (
    <>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form onSubmit={handleRegisterSubmit}>
            <label htmlFor="chk" aria-hidden="true" to="/register">
              Sign up
            </label>
            <input
              type="text"
              name="username"
              placeholder="User name"
              required
            />
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button type="submit">Sign up</button>
          </form>
        </div>
        <div className="login">
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="chk" aria-hidden="true" to="/login">
              Login
            </label>
            <input
              type="text"
              name="username"
              placeholder="username"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

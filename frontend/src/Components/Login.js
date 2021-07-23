import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login(props) {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (event) => {
    switch (event.target.className) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
    }
  };

  const handleLogin = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch("./account/login", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data === null) {
          props.history.push("/");
        } else {
          setError(data.msg);
        }
      });
  };
  return (
    <div className='container'>
      <div className='container-form'>
        <h1>Quiz App</h1>
        <input
          type='text'
          placeholder='Username'
          className='username'
          onChange={handleInput}
          maxlength='16'
        />
        <input
          type='text'
          className='password'
          placeholder='Password'
          onChange={handleInput}
          maxlength='8'
        />
        <button onClick={handleLogin}>Login</button>
        {error !== "" && <p className='error'>{error}</p>}
        <div class='redirector'>
          Don't have an account? <Link to='/signup'>Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

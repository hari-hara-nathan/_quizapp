import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './Login.css'


function Signup(props) {
  const[error,setError]=useState(null)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleInput = (event) => {
    switch (event.target.className) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "email":
        setEmail(event.target.value)
    }
  };

  const handleSignup = () => {
 const requestOptions = {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({
     username: username,
     email:email,
     password: password,
   }),
 };
 fetch("./account/signup", requestOptions)
   .then((response) => {
     if (response.status === 201) {
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
          type='email'
          placeholder='Email'
          className='email'
          onChange={handleInput}
        />
        <input
          type='text'
          className='password'
          placeholder='Password'
          onChange={handleInput}
          maxlength='8'
        />
        <button onClick={handleSignup}>Sign Up</button>
        {error !== null && <p className='error'>{error}</p>}
        <div class='redirector'>
          Already have an account? <Link to='/login'>Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;

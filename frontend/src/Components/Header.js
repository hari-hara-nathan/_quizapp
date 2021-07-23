import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <div className='header'>
      <h1>Quiz App</h1>
      <div className='buttons'>
        {props.showBack && (
          <button className='btn back' onClick={props.handleBack}>
            back
          </button>
        )}<button onClick={props.handleLogout} className='btn logout'>
        Logout
      </button>
      </div>
      
    </div>
  );
}

export default Header;

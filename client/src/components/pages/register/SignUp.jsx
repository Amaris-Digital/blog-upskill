
import React, { useState} from "react";
import {Link} from "react-router-dom";
import "./signup.css"


function SignUp( ) {
	const [user, setUser] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");

  
	function handleSubmit(e) {
	  e.preventDefault();
	 const data = {
		username: username,
		password: password,
		password_confirmation: passwordConfirmation,
	  }
	
	  fetch("https://batsotso.herokuapp.com/signup", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	  }).then((r) => {
		if (r.ok) {
		  r.json().then((user) => setUser(user));
		 
		}
	  });
	}
  console.log(user)
  return (
    <div>
        <div className="container">
	<div className="screen">
		<div className="screen__content">
			<form onSubmit={handleSubmit} className="login">
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" 
					class="login__input" 
					id="username"
					autoComplete="off"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username / Email"/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" 
					className="login__input" 
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					autoComplete="current-password"
					placeholder="Password"/>
				</div>
        <div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" 
					className="login__input"
					id="password_confirmation"
                    value={passwordConfirmation}
                   onChange={(e) => setPasswordConfirmation(e.target.value)}
                   autoComplete="current-password" 
					placeholder="Confirm Password"/>
				</div>
				<button className="button login__submit">
					<Link to ="/settings" className="button__text">Register Now</Link>
          
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
      
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
    </div>
  )
}

export default SignUp
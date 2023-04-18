
import React, { useState } from "react";
import "./login.css"

function Login({ onLogin}) {
	const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
      e.preventDefault();
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => onLogin(user));
        } else {
          r.json().then((err) => console.log(err.errors));
        }
      });
    }
  
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
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="User name / Email"/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input 
					type="password" 
					className="login__input" 
					id="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"/>
				</div>
				<button className="button login__submit">
					<span className="button__text">Log In Now</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div className="social-login">
				<h3>log in via</h3>
				<div className="social-icons">
					<a href="/" className="social-login__icon fab fa-instagram"></a>
					<a href="/" className="social-login__icon fab fa-facebook"></a>
					<a href="/" className="social-login__icon fab fa-twitter"></a>
				</div>
			</div>
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

export default Login;
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../features/user";

const LoginForm = () => {
	const dispatch = useDispatch();
	const [userCredentials, setUserCredentials] = useState({
		email: "",
		password: "",
		keepLogged: false,
	});
	const handleInputChange = (event) => {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const inputName = target.name;
		userCredentials[inputName] = value;
		setUserCredentials({ ...userCredentials, [inputName]: value });
	};

	const handleSumbmit = (event) => {
		event.preventDefault();
		console.log("Final userForm => ", userCredentials);
		dispatch(userActions.loginUser(userCredentials.email, userCredentials.password, userCredentials.keepLogged));
	};
	return (
		<form onSubmit={handleSumbmit}>
			<div className="input-wrapper">
				<label htmlFor="email">Username</label>
				<input
					id="email"
					type="text"
					name="email"
					value={userCredentials.email}
					onChange={handleInputChange}
				/>
			</div>
			<div className="input-wrapper">
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					name="password"
					value={userCredentials.password}
					onChange={handleInputChange}
				/>
			</div>
			<div className="input-remember">
				<input
					type="checkbox"
					id="remember-me"
					name="keepLogged"
					onChange={handleInputChange}
				/>
				<label htmlFor="remember-me">Remember me</label>
			</div>
			<input className="sign-in-button" type="submit" value="Sign In" />
		</form>
	);
};

export default LoginForm;

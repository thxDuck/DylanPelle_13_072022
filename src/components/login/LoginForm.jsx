import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../features/user";
import { selectUserStatus, selectUserError } from "../../utils/selectors";

const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const error = useSelector(selectUserError);
	const status = useSelector(selectUserStatus);
	if (status === "resolved" && !error) {
		setTimeout(() => {
			navigate("/profile");
		}, 1000);
	}
	const [userCredentials, setUserCredentials] = useState({
		email: "",
		password: "",
		keepLogged: false,
	});

	const handleInputChange = (event) => {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value.toLowerCase().trim();
		const inputName = target.name;
		userCredentials[inputName] = value;
		setUserCredentials({ ...userCredentials, [inputName]: value });
	};

	const handleSumbmit = (event) => {
		event.preventDefault();
		dispatch(
			userActions.login(
				userCredentials.email,
				userCredentials.password,
				userCredentials.keepLogged
			)
		);
	};

	return (
		<form onSubmit={handleSumbmit}>
			<div className="input-wrapper">
				{status === "rejected" && !!error && <p className="message-error">{error}</p>}
			</div>
			<div className="input-wrapper">
				{status === "resolved" && !error && <p className="message-success">Bienvenue !</p>}
			</div>
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

			{status === "pending" ? (
				<input
					className="sign-in-button btn-pending"
					type="submit"
					value="Waiting"
					disabled={true}
				/>
			) : (
				<input className="sign-in-button" type="submit" value="Sign In" />
			)}
		</form>
	);
};

export default LoginForm;

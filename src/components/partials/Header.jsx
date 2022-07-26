import React from "react";
import { useSelector } from "react-redux";
import Login from "../partials/Login.jsx";
import NavProfile from "./NavProfile.jsx";
import { selectUserIsConnected, selectUserData } from "../../utils/selectors";
import argentBankLogo from "../../assets/img/argentBankLogo.png";

const Header = () => {
	const userIsLogged = useSelector(selectUserIsConnected);
	const userData = useSelector(selectUserData);
	console.log({ userData });
	return (
		<nav className="main-nav">
			<a className="main-nav-logo" href="./">
				<img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
				<h1 className="sr-only">Argent Bank</h1>
			</a>
			{ userIsLogged ? <NavProfile /> : <Login /> }
		</nav>
	);
};

export default Header;

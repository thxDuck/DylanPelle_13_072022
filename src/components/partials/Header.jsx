import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../partials/Login.jsx";
import NavProfile from "./NavProfile.jsx";

import { getUser } from "../../features/user";
import { selectUserIsConnected, selectUserStatus } from "../../utils/selectors";

import argentBankLogo from "../../assets/img/argentBankLogo.png";

const Header = () => {
	const connected = useSelector(selectUserIsConnected);
	const status = useSelector(selectUserStatus);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!connected && status !== "rejected") dispatch(getUser());
	}, [dispatch, status, connected]);

	return (
		<nav className="main-nav">
			<a className="main-nav-logo" href="./">
				<img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
				<h1 className="sr-only">Argent Bank</h1>
			</a>
			{connected ? <NavProfile /> : <Login />}
		</nav>
	);
};

export default Header;

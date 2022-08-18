import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../partials/Login.jsx";
import NavProfile from "./NavProfile.jsx";
import { getUser } from "../../features/user";
import argentBankLogo from "../../assets/img/argentBankLogo.png";

const Header = () => {
	const user = useSelector((state) => state.user); //get user state
    const dispatch = useDispatch()
    
    useEffect(() => {
		console.log({ user: user.status });
        if (user.status !== "rejected") dispatch(getUser());
    },[dispatch, user.status]);

	return (
		<nav className="main-nav">
			<a className="main-nav-logo" href="./">
				<img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
				<h1 className="sr-only">Argent Bank</h1>
			</a>
			{user.connected ? <NavProfile /> : <Login />}
		</nav>
	);
};

export default Header;

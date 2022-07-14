import React from "react";
import Login from "../partials/Login.jsx";

import argentBankLogo from "../../assets/img/argentBankLogo.png";

const Header = () => {
    return (
        <nav className="main-nav">
            <a className="main-nav-logo" href="./">
                <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </a>
            <Login />
        </nav>
    );
};

export default Header;

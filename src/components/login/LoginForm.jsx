import React from "react";
import Input from "../partials/forms/Input";

const LoginForm = () => {
    return (
        <form>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <Input id="username" type="text" />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <Input id="password" type="password" />
            </div>
            <div className="input-remember">
                <Input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <a className="sign-in-button" href="/profile">
                Sign In
            </a>
        </form>
    );
};

export default LoginForm;

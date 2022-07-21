import React from "react";
import { useState } from "react";

const LoginForm = () => {
    const [userForm, setUserForm] = useState({
        name: "",
        password: "",
        keepLogged: false,
    });

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const inputName = target.name;
        userForm[inputName] = value;
        setUserForm({ ...userForm, [inputName]: value });
    };

    const handleSumbmit = (event) => {
        event.preventDefault();
        console.log("Final userForm => ", userForm);
    };
    return (
        <form onSubmit={handleSumbmit}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" name="name" value={userForm.name} onChange={handleInputChange} />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" value={userForm.password} onChange={handleInputChange} />
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" name="keepLogged" onChange={handleInputChange} />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <input className="sign-in-button" type="submit" value="Sign In" />
        </form>
    );
};

export default LoginForm;

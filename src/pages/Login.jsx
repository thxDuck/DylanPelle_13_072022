import React from 'react'
import LoginForm from "../components/partials/loginForm.jsx";

const Login = () => {
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>

                <LoginForm />

            </section>
        </main>
    )
}

export default Login
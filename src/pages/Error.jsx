import React from "react";
import {Link} from "react-router-dom"
const Error = () => {
    
    return (
    <main className="main bg-dark error">
        <p  className="message-error">This page does not exist</p>
        <Link to="./">Back to home</Link>
    </main>
        );
};

export default Error;

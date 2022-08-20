import { Routes, Route } from "react-router-dom";

import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

import Home from "../pages/Home";
import Login from "../pages/Login.jsx";
import Profile from "../pages/Profile.jsx";
import Error from "../pages/Error.jsx";

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api-doc" element={<SwaggerUI url="./swagger.yaml" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default RoutesApp;

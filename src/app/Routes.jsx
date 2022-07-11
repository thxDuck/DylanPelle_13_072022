import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home";
import Error from "../pages/Error.jsx";

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default RoutesApp;

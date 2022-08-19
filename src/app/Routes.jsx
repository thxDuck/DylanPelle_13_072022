import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login.jsx";
import Profile from "../pages/Profile.jsx";
import Error from "../pages/Error.jsx";

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default RoutesApp;

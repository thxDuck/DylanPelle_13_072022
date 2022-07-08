import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error.jsx";

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default RoutesApp;

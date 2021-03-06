import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import RoutesApp from "./Routes.jsx";
import "../styles/style.css";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <RoutesApp />
            <Footer />
        </BrowserRouter>
    );
};
export default App;

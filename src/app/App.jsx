import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import RoutesApp from "./Routes.jsx";
import "../styles/style.css";
import store from "../utils/store";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <RoutesApp />
                <Footer />
            </BrowserRouter>
        </Provider>
    );
};
export default App;

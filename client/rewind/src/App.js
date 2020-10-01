import React from 'react';
import {RegisterPage} from "./components/pages/auth/RegisterPage";
import LoginPage from "./components/pages/auth/LoginPage";
import {NavBar} from "./components/layout/NavBar";
import {BrowserRouter} from "react-router-dom";
import {Content} from "./components/layout/Content";
import {AppRoutes} from "./AppRoutes";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <Content>
                <AppRoutes/>
            </Content>
        </BrowserRouter>
    );
}

export default App;

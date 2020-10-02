import React from 'react';
import { NavBar } from "./components/layout/NavBar";
import { BrowserRouter } from "react-router-dom";
import { Content } from "./components/layout/Content";
import { AppRoutes } from "./AppRoutes";
import {useSelector} from "react-redux";

function App() {
    const user = useSelector((state) => state.auth.user);

    return (
        <BrowserRouter>
            {user && <NavBar />}
            <Content>
                <AppRoutes />
            </Content>
        </BrowserRouter>
    );
}

export default App;

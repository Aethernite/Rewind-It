import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import LoginPage from "./components/pages/auth/LoginPage";
import {RegisterPage} from "./components/pages/auth/RegisterPage";

export const AppRoutes = () => {
    return (
        <Switch>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/register" exact component={RegisterPage}/>
            <Redirect to="/login"/>
        </Switch>
    )
}
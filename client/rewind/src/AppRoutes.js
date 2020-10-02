import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import LoginPage from "./components/pages/auth/LoginPage";
import {RegisterPage} from "./components/pages/auth/RegisterPage";
import {CreateTimesheet} from "./components/pages/timesheets/CreateTimesheet";
import TimesheetTable from "./components/TimeSheetTable";
import Background from "./components/Background";

export const AppRoutes = () => {
    return (
        <>
        <Background/>
        <Switch>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/register" exact component={RegisterPage}/>
            <Route path="/timesheet/create" exact component={CreateTimesheet}/>
            <Route path="/timesheet/edit" exact component={TimesheetTable}/>
            <Redirect to="/login"/>
        </Switch>
        </>
    )
}
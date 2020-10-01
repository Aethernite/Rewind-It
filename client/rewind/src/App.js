import React from 'react';
import {RegisterPage} from "./components/pages/auth/RegisterPage";
import LoginPage from "./components/pages/auth/LoginPage";
import {CreateTimesheet} from "./components/pages/timesheets/CreateTimesheet";

function App() {
    return (
        <div>
            {/*<LoginPage/>*/}
            {/*<RegisterPage/>*/}
            <CreateTimesheet/>
        </div>
    );
}

export default App;

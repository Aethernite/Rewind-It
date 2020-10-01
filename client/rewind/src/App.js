import React from 'react';
import Background from './components/Background';
import TimesheetTable from './components/TimeSheetTable';
import LoginPage from './components/pages/auth/LoginPage';

function App() {
    return (
        <div>
            <Background />
            <LoginPage />
        </div>
    );
}

export default App;

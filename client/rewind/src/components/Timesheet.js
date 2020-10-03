import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'

import TimesheetTable from './TimeSheetTable';

export const Timesheet = ({ from, to }) => {

    return (
        <TimesheetTable from={from} to={to}></TimesheetTable>
    )
};

export default Timesheet;

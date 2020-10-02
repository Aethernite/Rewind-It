import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import styled from 'styled-components';
import TimesheetTable from './TimeSheetTable';

const Table = styled.table`
border: 1px solid #2e2e2e;
border-bottom: none;
border-right: none;
border-left: none;
font-family: "Roboto", sans-serif;
background-color: #fff;
`;



export const Timesheet = ({ from, to }) => {

    return (
        <TimesheetTable from={from} to={to}></TimesheetTable>
    )
};

export default Timesheet;

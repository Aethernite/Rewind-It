import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css'
import styled from 'styled-components';
import TimesheetRow from './TimesheetRow';

const Table = styled.table`
border: 1px solid #2e2e2e;
border-bottom: none;
border-right: none;
border-left: none;
font-family: "Roboto", sans-serif;
background-color: #fff;
`;

export const TimesheetTable = () => {

    return (
        <Container className="mt-5">
            <Col className="d-flex justify-content-center">
                <Table className="table" style={{ width: '1200px' }}>
                    <thead className="thead-dark">
                        <tr className="text-center">
                            <th scope="col" style={{ width: '60px' }}>#</th>
                            <th scope="col" style={{ width: '280px' }}>Client: Project</th>
                            <th scope="col" style={{ width: '140px' }}>Task</th>
                            <th scope="col" style={{ width: '60px' }}># Mon</th>
                            <th scope="col" style={{ width: '60px' }}># Tue</th>
                            <th scope="col" style={{ width: '60px' }}># Wed</th>
                            <th scope="col" style={{ width: '60px' }}># Thu</th>
                            <th scope="col" style={{ width: '60px' }}># Fri</th>
                            <th scope="col" style={{ width: '60px' }}># Sat</th>
                            <th scope="col" style={{ width: '60px' }}># Sun</th>
                            <th scope="col" style={{ width: '60px' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <TimesheetRow></TimesheetRow>
                        <TimesheetRow></TimesheetRow>
                        <TimesheetRow></TimesheetRow>
                        <tr>
                            <td></td>
                            <td colSpan={2} style={{ textAlign: 'left', fontWeight: '500' }}>Total</td>
                            <td>8</td>
                            <td>8</td>
                            <td>8</td>
                            <td>8</td>
                            <td>8</td>
                            <td>8</td>
                            <td>8</td>
                            <td>60</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Container >
    )
};

export default TimesheetTable;

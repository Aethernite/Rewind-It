import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Button, Col, Container, Modal } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import moment from "moment";
import {
    deleteCurrentTimesheet, fetchTimesheet,
    saveCurrentTimesheet,
    submitCurrentTimesheet
} from "../../../store/slices/timesheet";
import styled from "styled-components";
import { fetchAllProjects } from "../../../store/slices/projects";
import TimesheetRow from "../../TimesheetRow";
import { fetchTimesheetById } from "../../../api/AuthQueries";

const Table = styled.table`
border: 1px solid #2e2e2e;
border-bottom: none;
border-right: none;
border-left: none;
font-family: "Roboto", sans-serif;
background-color: #fff;
`;

const IconYes = styled.i`
color: #26bf26;
transition: transform 0.2s;

&:hover{
    color: #2cde2c;
    transform: scale(1.1);
    cursor: pointer;
}
`;

const IconNo = styled.i`
color: #cc1d1f;
transition: transform 0.2s;

&:hover{
    color: #db2325;
    transform: scale(1.1);
    cursor: pointer;
}
`;

export const ViewTimesheet = ({ view }) => {
    const {
        params: { id },
    } = useRouteMatch();

    const dispatch = useDispatch();


    const timesheet = useSelector(state => state?.timesheet?.timesheet);
    const history = useHistory();

    React.useEffect(() => {
        if (id !== null) {
            dispatch(fetchTimesheet({ id }));
        }
    }, [dispatch, id])

    if (timesheet) {
        return (
            <Container className="mt-5">
                <Col className="d-flex justify-content-center">
                    <Table className="table" style={{ width: '1200px' }}>
                        <thead style={{ height: '80px' }}>
                            <tr style={{ height: '80px' }}>
                                <th colSpan="11" className="h-100">
                                    <span
                                        style={{ verticalAlign: 'top' }}>Timesheet for {moment(timesheet?.from).format('DD/MM/YYYY')} - {moment(timesheet?.to).format('DD/MM/YYYY')}</span>
                                    <div className="float-right">
                                        <span>Status: {timesheet?.statusType}</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <thead className="thead-dark">
                            <tr className="text-center">
                                <th scope="col" style={{ width: '60px' }}>#</th>
                                <th scope="col" style={{ width: '280px' }}>Client: Project</th>
                                <th scope="col" style={{ width: '140px' }}>Task</th>
                                <th scope="col" style={{ width: '60px' }}>{moment(timesheet?.from).format('DD')} Mon</th>
                                <th scope="col"
                                    style={{ width: '60px' }}>{moment(timesheet?.from).add(1, 'day').format('DD')} Tue
                            </th>
                                <th scope="col"
                                    style={{ width: '60px' }}>{moment(timesheet?.from).add(2, 'day').format('DD')} Wed
                            </th>
                                <th scope="col"
                                    style={{ width: '60px' }}>{moment(timesheet?.from).add(3, 'day').format('DD')} Thu
                            </th>
                                <th scope="col"
                                    style={{ width: '60px' }}>{moment(timesheet?.from).add(4, 'day').format('DD')} Fri
                            </th>
                                <th scope="col"
                                    style={{ width: '60px' }}>{moment(timesheet?.from).add(5, 'day').format('DD')} Sat
                            </th>
                                <th scope="col"
                                    style={{ width: '60px' }}>{moment(timesheet?.from).add(6, 'day').format('DD')} Sun
                            </th>
                                <th scope="col" style={{ width: '60px' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {timesheet?.activities.map((activity, index) => (
                                <TimesheetRow index={index} activity={activity} view={view}></TimesheetRow>
                            ))
                            }
                            <tr>
                                <td></td>
                                <td colSpan={2} style={{ textAlign: 'left', fontWeight: '500' }}>Total</td>
                                <td>{
                                    0
                                }</td>
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
            </Container>
        )
    } else {
        return <h1>Loading...</h1>
    }
}
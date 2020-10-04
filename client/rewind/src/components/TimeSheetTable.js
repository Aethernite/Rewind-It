import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import TimesheetRow from './TimesheetRow';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCurrentTimesheet } from '../store/slices/timesheet';
import { fetchAllProjects } from '../store/slices/projects';
import moment from 'moment';

const Table = styled.table`
border: 1px solid #2e2e2e;
border-bottom: none;
border-right: none;
border-left: none;
font-family: "Roboto", sans-serif;
background-color: #fff;
`;



export const TimesheetTable = ({ from, to }) => {
    const dispatch = useDispatch();
    const timesheet = useSelector(state => state.timesheet.timesheet);

    React.useEffect(() => {
        dispatch(fetchAllProjects());
    }, [dispatch])




    return (
        <Container className="mt-5">
            <Col className="d-flex justify-content-center">
                <Table className="table" style={{ width: '1200px' }}>
                    <thead style={{ height: '80px' }}>
                        <tr style={{ height: '80px' }}>
                            <th colSpan="11" className="h-100">
                                <span style={{ verticalAlign: 'top' }}>Timesheet for {timesheet.from} - {timesheet.to}</span>
                                <div className="float-right">
                                    <i class="far fa-trash-alt mr-2 fa-2x" style={{ color: '#2e2e2e', transform: "translateY(5px)" }}></i>
                                    <button type="button" class="btn btn-dark mr-3" onClick={() => dispatch(deleteCurrentTimesheet())}>DELETE</button>

                                    <i class="far fa-save mr-2 fa-2x" style={{ color: '#2e2e2e', transform: "translateY(5px)" }}></i>
                                    <button type="button" class="btn btn-dark mr-3">SAVE</button>

                                    <i class="far fa-check-circle mr-2 fa-2x" style={{ color: '#2e2e2e', transform: "translateY(5px)" }}></i>
                                    <button type="button" class="btn btn-dark mr-3">SUBMIT</button>


                                    <span>Status: {timesheet.statusType}</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <thead className="thead-dark">
                        <tr className="text-center">
                            <th scope="col" style={{ width: '60px' }}>#</th>
                            <th scope="col" style={{ width: '280px' }}>Client: Project</th>
                            <th scope="col" style={{ width: '140px' }}>Task</th>
                            <th scope="col" style={{ width: '60px' }}>{moment(timesheet.from).format('DD')} Mon</th>
                            <th scope="col" style={{ width: '60px' }}>{moment(timesheet.from).add(1, 'day').format('DD')} Tue</th>
                            <th scope="col" style={{ width: '60px' }}>{moment(timesheet.from).add(2, 'day').format('DD')} Wed</th>
                            <th scope="col" style={{ width: '60px' }}>{moment(timesheet.from).add(3, 'day').format('DD')} Thu</th>
                            <th scope="col" style={{ width: '60px' }}>{moment(timesheet.from).add(4, 'day').format('DD')} Fri</th>
                            <th scope="col" style={{ width: '60px' }}>{moment(timesheet.from).add(5, 'day').format('DD')} Sat</th>
                            <th scope="col" style={{ width: '60px' }}>{moment(timesheet.from).add(6, 'day').format('DD')} Sun</th>
                            <th scope="col" style={{ width: '60px' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {timesheet.activities.map((activity) => (
                            <TimesheetRow activity={activity}></TimesheetRow>
                        ))
                        }
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
        </Container>
    )
};

export default TimesheetTable;

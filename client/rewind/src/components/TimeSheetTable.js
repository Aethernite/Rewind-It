import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Modal } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import TimesheetRow from './TimesheetRow';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteCurrentTimesheet,
    resetTimesheet,
    saveCurrentTimesheet,
    submitCurrentTimesheet
} from '../store/slices/timesheet';
import { fetchAllProjects } from '../store/slices/projects';
import moment from 'moment';
import { useFormik } from 'formik';
import { schema } from '../validations/schemas/TimesheetRowValidationSchema';
import { useHistory } from "react-router-dom"
import { fetchUserTimesheets } from '../store/slices/timesheets';

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

const sum = arr => {
    let sum = 0;
    arr.forEach(element => {
        sum += element;
    });

    return sum;
}

export const TimesheetTable = () => {
    const dispatch = useDispatch();
    const timesheet = useSelector(state => state.timesheet.timesheet);
    const timesheetHours = useSelector(state => state?.timesheet);
    const history = useHistory();
    const [errors,setErrors] = React.useState(false);



    React.useEffect(() => {
        if (timesheet !== null) {
            dispatch(fetchAllProjects());
        }

        
    }, [dispatch])

    const [modalShow, setModalShow] = React.useState(false);


    const saveRequestBody = {
        activities: timesheet.activities,
        statusType: timesheet.statusType,

    }

    return (
        <Container className="mt-5">
            <Col className="d-flex justify-content-center">
                <Table className="table" style={{ width: '1200px' }}>
                    <thead style={{ height: '80px' }}>
                        <tr style={{ height: '80px' }}>
                            <th colSpan="11" className="h-100">
                                <span style={{ verticalAlign: 'top' }}>Timesheet for {moment(timesheet.from).format("DD/MM/YYYY")} - {moment(timesheet.to).format("DD/MM/YYYY")}</span>
                                <div className="float-right">
                                    <i class="far fa-trash-alt mr-2 fa-2x" style={{ color: '#2e2e2e', transform: "translateY(5px)" }}></i>
                                    <button type="button" class="btn btn-dark mr-3" onClick={() => setModalShow(true)}>DELETE</button>
                                    <Modal
                                        size="xs"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        show={modalShow}
                                    >
                                        <Modal.Header>
                                            <Modal.Title style={{ margin: '0 auto' }}>Delete confirmation</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                            <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <p style={{ justifyContent: "center", alignItems: "center", textAlign: 'center' }}>
                                                    Are you sure you want to <br></br> delete the timesheet for week <br></br> {timesheet.from + ' - ' + timesheet.to + "?"}
                                                </p>
                                            </h5>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
                                                <IconYes className="fas fa-check-circle fa-3x" onClick={() => {
                                                    dispatch(deleteCurrentTimesheet());
                                                    dispatch(fetchUserTimesheets({ cursor: 0 }));
                                                    let path = `/timesheet/home`;
                                                    history.push(path);
                                                }}/>
                                                <IconNo className="fas fa-times-circle fa-3x" onClick={() => setModalShow(false)}></IconNo>
                                            </div>
                                        </Modal.Footer>
                                    </Modal>

                                    <i class="far fa-save mr-2 fa-2x" style={{ color: '#2e2e2e', transform: "translateY(5px)" }}></i>
                                    <button type="button" class="btn btn-dark mr-3" onClick={async () => {
                                        await dispatch(saveCurrentTimesheet());
                                        dispatch(fetchUserTimesheets({ cursor: 0 }));
                                        let path = `/timesheet/home`;
                                        history.push(path);
                                    }}>SAVE</button>

                                    <i class="far fa-check-circle mr-2 fa-2x" style={{ color: '#2e2e2e', transform: "translateY(5px)" }}></i>
                                    <button type="button" className="btn btn-dark mr-3" onClick={async () => {
                                        await dispatch(submitCurrentTimesheet());
                                        dispatch(fetchUserTimesheets({ cursor: 0 }));
                                        let path = `/timesheet/home`;
                                        history.push(path);
                                    }}>SUBMIT
                                    </button>

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
                        {timesheet && timesheet?.activities.map((activity, index) => (
                                <TimesheetRow key={activity.id} index={index} activity={activity} errors={errors} setErrors={(val) => setErrors(val)}></TimesheetRow>
                            ))
                        }
                        <tr>
                            <td></td>
                            <td colSpan={2} style={{ textAlign: 'left', fontWeight: '500' }}>Total</td>
                            <td>{timesheetHours.mondayTotal ? timesheetHours.mondayTotal : 0}</td>
                            <td>{timesheetHours.tuesdayTotal}</td>
                            <td>{timesheetHours.wednesdayTotal}</td>
                            <td>{timesheetHours.thursdayTotal}</td>
                            <td>{timesheetHours.fridayTotal}</td>
                            <td>{timesheetHours.saturdayTotal}</td>
                            <td>{timesheetHours.sundayTotal}</td>
                            <td>{timesheetHours.total}</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Container>
    )
};

export default TimesheetTable;

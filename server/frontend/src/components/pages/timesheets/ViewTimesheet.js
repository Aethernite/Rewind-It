import { useDispatch, useSelector } from "react-redux";
import React from "react";
import "../../../css/Loading.css";
import { Col, Container, Modal } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import moment from "moment";
import {
    deleteCurrentTimesheet, fetchTimesheet,
    saveCurrentTimesheet,
    submitCurrentTimesheet,
} from "../../../store/slices/timesheet";
import styled from "styled-components";
import TimesheetRow from "../../TimesheetRow";
import {fetchUserTimesheets, resetTimesheets} from "../../../store/slices/timesheets";
import Tippy from '@tippyjs/react';
import {Table as TableB} from "react-bootstrap"

const Table = styled(TableB)`
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

const Icon = styled.i`
transform: translateY(5px);
transition: transform 0.2s;
margin-right: 1.5rem;

&:hover{
    transform: translateY(5px) scale(1.2);
    cursor: pointer;
}
`;

const Thead = styled.thead`
background: radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgb(76, 78, 199) 0%, rgb(95, 118, 249) 100.2% );
color:white;
`;

export const ViewTimesheet = ({ view }) => {
    const {
        params: { id },
    } = useRouteMatch();

    const dispatch = useDispatch();

    const timesheet = useSelector(state => state?.timesheet?.timesheet);
    const timesheetHours = useSelector(state => state?.timesheet);
    const isFetching = useSelector(state => state.timesheet.isFetching);
    const history = useHistory();
    const errors = useSelector(state => state.timesheet.errors);

    React.useEffect(() => {

            async function fetchTimesheetById() {
                await dispatch(fetchTimesheet({ id }));
            }
            fetchTimesheetById().then();

        return () => {
            dispatch(resetTimesheets());
        }
    }, [dispatch, id])

    const [modalShow, setModalShow] = React.useState(false);
    const [modalSaveShow, setModalSaveShow] = React.useState(false);
    const [modalErrorsShow, setModalErrorsShow] = React.useState(false);
    const [modalSubmitShow, setModalSubmitShow] = React.useState(false);

    const handleModal = ({modal}) => {
        if(hasErrors(errors, timesheet.activities)){
            setModalErrorsShow(true);
            
        } else{
            if(modal === "save"){
                setModalSaveShow(true);
            }
            else if(modal === "submit"){
                setModalSubmitShow(true);
            }
        }
    }

    const hasErrors = (errors, activities) =>{
        console.log(errors);
        if(activities.length === 1){
            return true;
        }
        return !!errors.some((el) => {
            if (el) {
                if (Object.keys(el).length > 0) {
                    return true;
                }
            }
            return false;
        });
    }

    if (!isFetching) {
        return (
            <Container className="mt-5">
                <Col className="d-flex justify-content-center">
                    <Table style={{marginBottom: "200px", width: '1200px'}}>
                        <thead style={{ height: '80px' }}>
                            <tr style={{ height: '80px' }}>
                                <th colSpan="11" className="h-100">
                                    <span
                                        style={{ verticalAlign: 'top' }}>Timesheet for {moment(timesheet?.from).format('DD/MM/YYYY')} - {moment(timesheet?.to).format('DD/MM/YYYY')}</span>
                                        <div className="float-right">
                                    {timesheet?.statusType === "OPEN" && (
                                     <Tippy content={"Deletes the timesheet."} arrow={true} placement='top' theme={"dark"} style={{ display: "inline-block" }}>
                                     <Icon className="far fa-trash-alt fa-2x icon-delete" onClick={() => setModalShow(true)}></Icon>
                                    </Tippy>)}
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
                                                    Are you sure you want to <br></br> delete the timesheet for week <br></br> {moment(timesheet?.from).format("DD/MM/YYYY") + ' - ' + moment(timesheet?.to).format("DD/MM/YYYY") + "?"}
                                                </p>
                                            </h5>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
                                                <IconYes className="fas fa-check-circle fa-3x" onClick={async () => {
                                                    await dispatch(deleteCurrentTimesheet());
                                                    dispatch(fetchUserTimesheets({ cursor: 0 }));
                                                    let path = `/timesheet/home`;
                                                    history.push(path);
                                                }}/>
                                                <IconNo className="fas fa-times-circle fa-3x" onClick={() => setModalShow(false)}></IconNo>
                                            </div>
                                        </Modal.Footer>
                                    </Modal>

                                    {timesheet?.statusType === "OPEN" &&
                                    <>
                                    <Tippy content={"Saves the timesheet."} arrow={true} placement='top' theme={"dark"} style={{ display: "inline-block" }}>
                                    <Icon className="far fa-save fa-2x icon-save" onClick={() => handleModal({modal: 'save'})}></Icon>
                                    </Tippy>
                                    </>
                                    }
                                    <Modal
                                        size="xs"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        show={modalSaveShow}
                                    >
                                        <Modal.Header>
                                            <Modal.Title style={{ margin: '0 auto' }}>Save confirmation</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                            <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <p style={{ justifyContent: "center", alignItems: "center", textAlign: 'center' }}>
                                                    Are you sure you want to <br></br> save the timesheet for week <br></br> {moment(timesheet?.from).format("DD/MM/YYYY") + ' - ' + moment(timesheet?.to).format("DD/MM/YYYY") + "?"}
                                                </p>
                                            </h5>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
                                                <IconYes className="fas fa-check-circle fa-3x" onClick={async () => {
                                        await dispatch(saveCurrentTimesheet());
                                        dispatch(fetchUserTimesheets({ cursor: 0 }));
                                        let path = `/timesheet/home`;
                                        history.push(path);
                                    }}/>
                                                <IconNo className="fas fa-times-circle fa-3x" onClick={() => setModalSaveShow(false)}></IconNo>
                                            </div>
                                        </Modal.Footer>
                                    </Modal>

                                    <Modal
                                        size="xs"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        show={modalErrorsShow}
                                    >
                                        <Modal.Header style={{backgroundColor: "#dc3545"}}>
                                            <Modal.Title style={{ margin: '0 auto', height: '5rem', color: 'white' }}><i className="far fa-times-circle fa-3x"></i></Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                            <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <p style={{ justifyContent: "center", alignItems: "center", textAlign: 'center' }}>
                                                    Oh snap! <br></br> Try fixing your errors before trying to save again.
                                                </p>
                                            </h5>
                                        </Modal.Body>
                                        <Modal.Footer>
                                                <button style={{margin: '0 auto', width:"8rem"}} type="button" onClick={() => setModalErrorsShow(false)} className="btn btn-outline-danger">Close</button>
                                        </Modal.Footer>
                                    </Modal>

                                    {timesheet?.statusType === "OPEN" &&
                                    <>
                                
                                   <Tippy content={"Submits the timesheet."} arrow={true} placement='top' theme={"dark"} style={{ display: "inline-block" }}>
                                   <Icon className="far fa-check-circle fa-2x icon-submit" onClick={() => handleModal({modal: 'submit'})}></Icon>
                                    </Tippy>
                                    </>
                                    }

                                    <Modal
                                        size="xs"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        show={modalSubmitShow}
                                    >
                                        <Modal.Header>
                                            <Modal.Title style={{ margin: '0 auto' }}>Submit confirmation</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                            <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <p style={{ justifyContent: "center", alignItems: "center", textAlign: 'center' }}>
                                                    Are you sure you want to <br></br> save and submit the timesheet for week <br></br> {moment(timesheet?.from).format("DD/MM/YYYY") + ' - ' + moment(timesheet?.to).format("DD/MM/YYYY") + "?"}
                                                </p>
                                            </h5>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
                                                <IconYes className="fas fa-check-circle fa-3x" onClick={() => {
                                        dispatch(submitCurrentTimesheet({timesheetId:timesheet?.id}));
                                        dispatch(fetchUserTimesheets({ cursor: 0 }));
                                        let path = `/timesheet/home`;
                                        history.push(path);
                                    }}/>
                                                <IconNo className="fas fa-times-circle fa-3x" onClick={() => setModalSubmitShow(false)}></IconNo>
                                            </div>
                                        </Modal.Footer>
                                    </Modal>

                                    <span>Status: {timesheet?.statusType}</span>
                                </div>
                                </th>
                            </tr>
                        </thead>
                        <Thead>
                            <tr className="text-center">
                                <th scope="col" style={{ width: '60px' }}>#</th>
                                <th scope="col" style={{ width: '280px' }}>Client: Project</th>
                                <th scope="col" style={{ width: '140px' }}>Task</th>
                                <th scope="col" style={{ width: '60px' }}>{moment(timesheet?.from).format('DD/MM')} Mon</th>
                                <th scope="col"
                                    style={{ width: '60px' }}>{moment(timesheet?.from).add(1, 'day').format('DD/MM')} Tue
                            </th>
                                <th scope="col"
                                    style={{ width: '60px' }}>{moment(timesheet?.from).add(2, 'day').format('DD/MM')} Wed
                            </th>
                                <th scope="col"
                                    style={{ width: '60px' }}>{moment(timesheet?.from).add(3, 'day').format('DD/MM')} Thu
                            </th>
                                <th scope="col"
                                    style={{ width: '60px' }}>{moment(timesheet?.from).add(4, 'day').format('DD/MM')} Fri
                            </th>
                                <th scope="col"
                                    style={{ width: '60px' }}>{moment(timesheet?.from).add(5, 'day').format('DD/MM')} Sat
                            </th>
                                <th scope="col"
                                    style={{ width: '60px' }}>{moment(timesheet?.from).add(6, 'day').format('DD/MM')} Sun
                            </th>
                                <th scope="col" style={{ width: '60px' }}>Total</th>
                            </tr>
                        </Thead>
                        <tbody className="text-center">
                            {timesheet?.activities.map((activity, index) => (
                                <TimesheetRow key={activity.id} submitted={timesheet?.statusType} index={index} activity={activity}></TimesheetRow>
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
    } else {
        return <div className="loading">Loading&#8230;</div>
    }
}
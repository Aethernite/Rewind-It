import React from "react";
import { Button, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchUserTimesheets } from '../../../store/slices/timesheets';
import Moment from 'react-moment';
import ReactPaginate from 'react-paginate';
import { ConfirmationBox } from "../../common/ConfirmationBox";
import moment from 'moment';
import {useHistory} from "react-router-dom";
import {fetchTimesheetById} from "../../../api/AuthQueries";
import {fetchTimesheet} from "../../../store/slices/timesheet";


const Table = styled.table`
border: 1px solid #2e2e2e;
border-bottom: none;
border-right: none;
border-left: none;
font-family: "Roboto", sans-serif;
background-color: #fff;
`;

const Header = styled.h2`
font-family: 'Roboto', sans-serif;
font-weight: 300;
font-size: 2rem;
letter-spacing: 0rem;
margin-bottom: 2rem;
`;


export const TimesheetsPage = () => {


    const timesheets = useSelector(state => state.timesheets.timesheets.content);
    const page = useSelector(state => state.timesheets.timesheets);
    const hasMore = useSelector(state => state.timesheets.hasMore);
    const dispatch = useDispatch();
    const history = useHistory();


    React.useEffect(() => {
        dispatch(fetchUserTimesheets({ cursor: 0 }));
    }, [dispatch, timesheets?.length]);

    const handlePageChange = e => {
        dispatch(fetchUserTimesheets({ cursor: e.selected }));
    }

    const handleClick = ({id}) => {
        dispatch(fetchTimesheet({id}));
        history.push(`/timesheet/view/${id}`);
    }

    const [modalShow, setModalShow] = React.useState(false);

    return (
        <Container className="mt-5">
            <Col className="d-flex justify-content-center">
                <Table className="table" style={{ width: '1200px' }}>
                    <thead style={{ height: '80px' }}>
                        <tr style={{ height: '80px' }}>
                            <th colSpan="11" className="h-100">
                                <div className="col-md-12 text-center">
                                    <Header>Your Timesheets:</Header>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <thead className="thead-dark">
                        <tr className="text-center">
                            <th scope="col" style={{ width: '560px' }}>Week</th>
                            <th scope="col" style={{ width: '140px' }}>Status</th>
                            <th scope="col" style={{ width: '140px' }}>Options</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                    {timesheets && timesheets?.map(timesheet => (
                        <tr>
                            <td>
                                <div classname="mt-2">
                                    <span>Week <Moment format={"DD/MM/YYYY"}>{timesheet?.from}</Moment> - <Moment
                                        format={"DD/MM/YYYY"}>{timesheet?.to}</Moment></span>
                                </div>
                            </td>
                            <td>
                                <div className="mt-2">
                                    <span>{timesheet?.statusType === "SUBMITTED" ? "Submitted" : "Open"}</span>
                                </div>
                            </td>
                            <td>
                                <div style={{display: "flex"}}>
                                    {timesheet?.statusType === "SUBMITTED" ?
                                        <Button variant="outline-dark" style={{marginRight: "0.2rem"}}
                                                className="form-control" onClick={() => handleClick({id: timesheet?.id})}>View</Button> :
                                        <Button variant="outline-dark" style={{marginRight: "0.2rem"}}
                                                className="form-control">Edit</Button>}
                                    <Button variant="outline-dark" className="form-control"
                                            disabled={timesheet?.statusType === "SUBMITTED"}
                                            onClick={() => setModalShow(true)}>Delete</Button>
                                    <ConfirmationBox
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        week={{week: moment(timesheet.from).format("DD/MM/YYYY") + " to " + moment(timesheet.to).format("DD/MM/YYYY")}}
                                        timesheetId={timesheet.id}
                                    />
                                </div>
                            </td>
                        </tr>)
                    )}
                    <tr>
                        <td colSpan="3">
                            <div className="d-flex justify-content-center">
                                {timesheets?.length > 0 && <ReactPaginate
                                    pageCount={page.totalPages}
                                    pageRangeDisplayed={page.totalPages}
                                    marginPagesDisplayed={0}
                                    onPageChange={(e) => handlePageChange(e)}
                                    breakClassName={'page-item'}
                                    breakLinkClassName={'page-link'}
                                    containerClassName={'pagination'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    previousClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                    activeClassName={'active'}
                                ></ReactPaginate>}

                                {timesheets?.length === 0 && <span>No timesheets found.</span>}
                            </div>
                        </td>
                    </tr>

                        {/* <tr>
                            <td>
                                <div className="mt-2">
                                    <span>Week 28/09/2020 - 04/10/2020</span>
                                </div>
                            </td>
                            <td>
                                <div className="mt-2">
                                    <span>Open</span>
                                </div>
                            </td>
                            <td>
                                <div style={{ display: "flex" }}>
                                    <Button variant="outline-dark" style={{ marginRight: "0.2rem" }}
                                        className="form-control">Edit</Button>
                                    <Button variant="outline-dark" className="form-control" onClick={() => setModalShow(true)}>Delete</Button>
                                    <ConfirmationBox
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        week={{week: "28/09/2020 - 04/10/2020"}}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="mt-2">
                                    <option>Week 05/10/2020 - 11/10/2020</option>
                                </div>
                            </td>
                            <td>
                                <div className="mt-2">
                                    <span>Submitted</span>
                                </div>
                            </td>
                            <td>
                                <div style={{ display: "flex" }}>
                                    <Button variant="outline-dark" style={{ marginRight: "0.2rem" }}
                                        className="form-control">View</Button>
                                    <Button disabled={true} variant="outline-dark" className="form-control">Delete</Button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="mt-2">
                                    <option>Week 12/09/2020 - 18/10/2020</option>
                                </div>
                            </td>
                            <td>
                                <div className="mt-2">
                                    <span>Submitted</span>
                                </div>
                            </td>
                            <td>
                                <div style={{ display: "flex" }}>
                                    <Button variant="outline-dark" style={{ marginRight: "0.2rem" }}
                                        className="form-control">View</Button>
                                    <Button disabled={true} variant="outline-dark" className="form-control">Delete</Button>
                                </div>
                            </td>
                        </tr> */}
                        {/*<TimesheetRow></TimesheetRow>*/}
                        {/*<tr>*/}
                        {/*    <td></td>*/}
                        {/*    <td colSpan={2} style={{ textAlign: 'left', fontWeight: '500' }}>Total</td>*/}
                        {/*    <td>8</td>*/}
                        {/*    <td>8</td>*/}
                        {/*    <td>8</td>*/}
                        {/*    <td>8</td>*/}
                        {/*    <td>8</td>*/}
                        {/*    <td>8</td>*/}
                        {/*    <td>8</td>*/}
                        {/*    <td>60</td>*/}
                        {/*</tr>*/}
                    </tbody>
                </Table>
            </Col>
        </Container>


        // <Container className="mt-5">
        //         <Col className="d-flex justify-content-center">
        //             <Table className="table" style={{width: '1200px'}}>
        //                 <thead style={{height: '80px'}}>
        //                 <tr style={{height: '80px'}}>
        //                     <th className="d-flex justify-content-center">
        //                         <div className="col-md-12 text-center">
        //                             <Header>Your Timesheets:</Header>
        //                         </div>
        //                     </th>
        //                 </tr>
        //                 </thead>
        //                 <tbody>
        //                 <tr style={{height: '80px'}}>
        //                     <td className="col-md-5 text">
        //                         <div>
        //                             Week 21/09/2020 - 27/09/2020
        //                         </div>
        //                     </td>
        //                     <td className="col-md-3 text">
        //                         <div>
        //                             Week 28/09/2020 - 04/10/2020
        //                         </div>
        //                     </td>
        //                     {/*<td className="col-md-2 text">*/}
        //                     {/*    <div>*/}
        //                     {/*        Week 28/09/2020 - 04/10/2020*/}
        //                     {/*    </div>*/}
        //                     {/*</td>*/}
        //                     {/*<td className="col-md-2 text">*/}
        //                     {/*    <div>*/}
        //                     {/*        Week 28/09/2020 - 04/10/2020*/}
        //                     {/*    </div>*/}
        //                     {/*</td>*/}
        //                 </tr>
        //                 </tbody>
        //             </Table>
        //         </Col>
        // </Container>
    )
}
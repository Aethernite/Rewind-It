import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import TimesheetRow from "../../TimesheetRow";

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

const Input = styled.input`
text-align: center;
background-image: none !important;
padding: 0px !important;
display: inline-block;
`;

const Icon = styled.i`
display: inline-block;
color: #2e2e2e;
transition: transform 0.2s;


&:hover{
    transform: scale(1.2);
    cursor: pointer;
    color: red;
}
`;

export const TimesheetsPage = () => {
    return (
        <Container className="mt-5">
            <Col className="d-flex justify-content-center">
                <Table className="table" style={{width: '1200px'}}>
                    <thead style={{height: '80px'}}>
                    <tr style={{height: '80px'}}>
                        <th colSpan="11" className="h-100">
                            <div className="col-md-12 text-center">
                                <Header>Your Timesheets:</Header>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <thead className="thead-dark">
                    <tr className="text-center">
                        <th scope="col" style={{width: '560px'}}>Week</th>
                        <th scope="col" style={{width: '140px'}}>Status</th>
                        <th scope="col" style={{width: '140px'}}>Options</th>
                    </tr>
                    </thead>
                    <tbody className="text-center">
                    <tr>
                        <td>
                            <div className="mt-2">
                                <option>Week 28/09/2020 - 04/10/2020</option>
                            </div>
                        </td>
                        <td>
                            <div className="mt-2">
                                <span>Open</span>
                            </div>
                        </td>
                        <td>
                            <div style={{display: "flex"}}>
                                <Button variant="outline-dark" style={{marginRight: "0.2rem"}}
                                        className="form-control">Edit</Button>
                                <Button variant="outline-dark" className="form-control">Delete</Button>
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
                            <div style={{display: "flex"}}>
                                <Button variant="outline-dark" style={{marginRight: "0.2rem"}}
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
                            <div style={{display: "flex"}}>
                                <Button variant="outline-dark" style={{marginRight: "0.2rem"}}
                                        className="form-control">View</Button>
                                <Button disabled={true}  variant="outline-dark" className="form-control">Delete</Button>
                            </div>
                        </td>
                    </tr>
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
import React from "react";
import { Modal, Button } from "react-bootstrap";
import styled from 'styled-components';



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
export const ConfirmationBox = (props) => {
    console.log(props);
    return (
        <Modal
            {...props}
            size="xs"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title style={{ margin: '0 auto' }}>Delete confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <p style={{ justifyContent: "center", alignItems: "center", textAlign: 'center' }}>
                        Are you sure you want to <br></br> delete the timesheet for week <br></br> {props.week.week}?
                </p>
                </h5>
            </Modal.Body>
            <Modal.Footer>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
                    <IconYes className="fas fa-check-circle fa-3x"></IconYes>
                    <IconNo className="fas fa-times-circle fa-3x"></IconNo>
                    <Button hidden style={{ width: "25%", height: "2.5rem" }} variant="dark" onClick={props.onHide}>Yes</Button>
                    <Button hidden style={{ width: "25%", height: "2.5rem" }} variant="dark" onClick={props.onHide}>No</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
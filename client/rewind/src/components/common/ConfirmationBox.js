import React from "react";
import {Modal, Button} from "react-bootstrap";

export const ConfirmationBox = (props) => {
    console.log(props.week.week);
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body style={{display: "flex", height: "100%", justifyContent: "center", alignItems: "center"}}>
                <h5 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <p style={{justifyContent: "center", alignItems: "center"}}>
                    Are you sure you want to delete the timesheet for week {props.week.week}?
                </p>
                </h5>
            </Modal.Body>
            <Modal.Footer>
                <div style={{display: "flex", width: "100%", justifyContent: "space-around"}}>
                <Button style={{width: "25%", height: "2.5rem"}} variant="dark" onClick={props.onHide}>Yes</Button>
                <Button style={{width: "25%", height: "2.5rem"}} variant="dark" onClick={props.onHide}>No</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
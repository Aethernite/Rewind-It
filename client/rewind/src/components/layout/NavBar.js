import React from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import rewind from "./rewind-logo.png"
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
display: flex;
`

const Title = styled.div`
  font-family: 'Lobster', cursive;
  letter-spacing: 0.2rem;
  font-size: 1.25rem;
  margin-left: 0.2rem;
`

export const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
            <Navbar.Brand href="#home">
                <Container>
                    <img
                        alt=""
                        src={rewind}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    <Title>REWIND</Title>
                </Container>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
                <Nav fill variant="tabs" defaultActiveKey="1">
                    <Nav.Link style={{backgroundColor: "transparent", width: "12rem"}} eventKey="1" as={NavLink}
                              to="/login" exact>
                        All Timesheets
                    </Nav.Link>
                    <Nav.Link style={{backgroundColor: "transparent", width: "12rem"}} eventKey="2" as={NavLink}
                              to="/register" exact>
                        Create Timesheet
                    </Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#logout">Mark Otto</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar.Collapse>
        </Navbar>
    )
}
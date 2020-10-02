import React, {useState} from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../../store/slices/auth';

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
    const [activeKey, setActiveKey] = useState({activeKey: 1});
    const dispatch = useDispatch();
    const userEmail = useSelector((state) => state?.user?.email);

    const handleSelect = (selectedKey) => {
        if (!isNaN(selectedKey)) {
            setActiveKey({activeKey: 1})
        }

        setActiveKey(selectedKey);
    }

    return (
        <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
            <Container>
                <Navbar.Brand href="#home">
                    <Link to={"/"} style={{textDecoration: "none", color: "white"}} onClick={handleSelect}>
                        <i style={{color: "cornflowerblue", display: "inline-block"}}
                           className="fa mt-1 fa-history"></i>
                        <Title style={{display: "inline-block"}}>REWIND</Title>
                    </Link>
                </Navbar.Brand>
            </Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse>
                <Nav fill variant="tabs" activeKey={activeKey} style={{border: "none"}} onSelect={handleSelect}>
                    {/*<Nav.Link style={{backgroundColor: "transparent", width: "12rem", borderRadius: "5px"}} eventKey={1} as={NavLink}*/}
                    {/*          to="/login" exact>*/}
                    {/*    Login*/}
                    {/*</Nav.Link>*/}
                    {/*<Nav.Link style={{backgroundColor: "transparent", width: "12rem", borderRadius: "5px"}} eventKey={2} as={NavLink}*/}
                    {/*          to="/register" exact>*/}
                    {/*    Register*/}
                    {/*</Nav.Link>*/}
                    <Nav.Link style={{backgroundColor: "transparent", width: "12rem", borderRadius: "5px"}} eventKey={1} as={NavLink}
                              to="/timesheet/edit" exact>
                        All Timesheets
                    </Nav.Link>
                    <Nav.Link style={{backgroundColor: "transparent", width: "12rem", borderRadius: "5px"}} eventKey={2} as={NavLink}
                              to="/timesheet/create" exact>
                        Create Timesheets
                    </Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#logout">Mark Otto</a>
                    </Navbar.Text>
                    <Nav fill variant="tabs" className="ml-2" style={{border: "none"}} activeKey={activeKey} onSelect={handleSelect}>
                        <Nav.Link onClick={() => dispatch(logout())} style={{backgroundColor: "transparent", width: "6rem", borderRadius: "5px"}} eventKey={3} as={NavLink}
                                  to="/" exact>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar.Collapse>
        </Navbar>
    )
}
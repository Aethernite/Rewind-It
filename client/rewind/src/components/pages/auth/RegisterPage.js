import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import {FormGroup, Container, Col, Alert} from 'react-bootstrap';
import {Formik} from 'formik';
import "../../../css/Animation.css";
import classNames from 'classnames';
import {RegisterValidationSchema} from "../../../validations/schemas/RegisterValidationSchema";

const Title = styled.h1`
  font-family: 'Lobster', cursive;
  letter-spacing: 0.2rem;
  font-size: 3em;
  //color: #f0eeee;
  color: #2e2e2e;
`

const Label = styled.label`
font-family: 'Roboto', sans-serif;
font-weight: 400;
`;

const Form = styled.form`
 position: relative;
    display: -ms-flexbox;
    display: flex;
    padding: 1rem;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 1.1rem;
    outline: 0;
    max-width: 500px;
    font-family: 'Roboto', sans-serif;
 
    input::placeholder{
       font-style:italic;
       font-family: 'Roboto', sans-serif;
       opacity: 0.4;
     }
`;



const Button = styled.button`
  height: 2.50rem;
  border-radius: 10px;
  border-color: #FFFFFF;
  outline: none;
  border-style: none;
  transition: border 0.3s ease;
  &:hover{
  border: 2px solid #81D9FF;
  cursor: pointer;
  }
`

const Header = styled.h2`
font-family: 'Roboto', sans-serif;
font-weight: 300;
font-size: 2rem;
letter-spacing: 0rem;
`;

export const RegisterPage = () => {
    return (
        <Container className="mt-5">
            <div className="ocean">
                <div className="wave"/>
                <div className="wave"/>
                <div className="wave"/>
            </div>
            <Col className="d-flex justify-content-center">
                {/*<div className="d-flex justify-content-center">*/}

                {/*</div>*/}
                <Formik
                    initialValues={{username: "", password: "", confirmPassword: ""}}
                    onSubmit={(values, actions) => {

                    }}
                    validationSchema={RegisterValidationSchema}
                >
                    {props => {
                        return (<Form className="myform shadow">
                            <div className="logo mb-3">
                                <div className="col-md-12 text-center">
                                    <Title>REWIND</Title>
                                    <Header>REGISTER</Header>
                                </div>
                            </div>
                            <FormGroup className="form-group">
                                <Label className="form-label">Username</Label>
                                {props.touched.username && props.errors.username &&
                                <Alert variant="danger">{props.errors.username}</Alert>}
                                <input type="text"
                                       name="username"
                                       className={"form-control " + classNames(props.touched.username
                                           && !props.errors.username
                                           && "is-valid",
                                           props.touched.username
                                           && props.errors.username
                                           && "is-invalid")}
                                       onBlur={props.handleBlur}
                                       onChange={props.handleChange}
                                       id="username"
                                       placeholder="Enter Username"
                                />
                            </FormGroup>
                            <FormGroup className="form-group">
                                <Label className="form-label">Password</Label>
                                {props.touched.password && props.errors.password &&
                                <Alert variant="danger">{props.errors.password}</Alert>}
                                <input type="password"
                                       name="password"
                                       id="password"
                                       className={"form-control " + classNames(props.touched.password
                                           && !props.errors.password
                                           && "is-valid",
                                           props.touched.password
                                           && props.errors.password
                                           && "is-invalid")}
                                       onBlur={props.handleBlur}
                                       onChange={props.handleChange}
                                       placeholder="Enter Password"/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <Label className="form-label">Confirm Password</Label>
                                {props.touched.confirmPassword && props.errors.confirmPassword &&
                                <Alert variant="danger">{props.errors.confirmPassword}</Alert>}
                                <input type="password"
                                       name="confirmPassword"
                                       id="confirmPassword"
                                       className={"form-control " + classNames(props.touched.confirmPassword
                                           && !props.errors.confirmPassword
                                           && "is-valid",
                                           props.touched.confirmPassword
                                           && props.errors.confirmPassword
                                           && "is-invalid")}
                                       onBlur={props.handleBlur}
                                       onChange={props.handleChange}
                                       placeholder="Confirm password"/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <p className="text-center">By signing up you accept our <a href="#TermsOfUse">Terms Of Use</a></p>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <div className="col-md-12 text-center ">
                                    <Button type="submit" className="btn-block btn-dark shadow-none">Register</Button>
                                    {/*<div className="svg-wrapper">*/}
                                    {/*    <svg height="40" width="150" xmlns="http://www.w3.org/2000/svg">*/}
                                    {/*        <rect id="shape" height="40" width="150"/>*/}
                                    {/*        <div id="text">*/}
                                    {/*            <a href=""><span className="spot"></span>Button 1</a>*/}
                                    {/*        </div>*/}
                                    {/*    </svg>*/}
                                    {/*</div>*/}
                                </div>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <p className="text-center">Already have account? <a href="#signin">Sign in here</a></p>
                            </FormGroup>
                        </Form>);
                    }}
                </Formik>
            </Col>
        </Container>
    )
}

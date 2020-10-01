import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
<<<<<<< HEAD
import { FormGroup, Container, Col, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import "../../../css/Animation.css";
import classNames from 'classnames';
import { RegisterValidationSchema } from "../../../validations/schemas/RegisterValidationSchema";
import "../../../css/forms.scss";
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../store/slices/auth';

=======
import {FormGroup, Container, Col, Alert} from 'react-bootstrap';
import {Formik} from 'formik';
import "../../../css/Animation.css";
import classNames from 'classnames';
import {RegisterValidationSchema} from "../../../validations/schemas/RegisterValidationSchema";
import "../../../css/forms.scss";
>>>>>>> e6b5fce2d1545897eea074ead5d8f553a7025017

const Title = styled.h1`
  font-family: 'Lobster', cursive;
  letter-spacing: 0.2rem;
  font-size: 4rem;
  transition: transform 0.2s;

&:hover{
    transform: scale(1.2);
    cursor: pointer;
}
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

<<<<<<< HEAD
=======


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

>>>>>>> e6b5fce2d1545897eea074ead5d8f553a7025017
const Header = styled.h2`
font-family: 'Roboto', sans-serif;
font-weight: 300;
font-size: 2rem;
letter-spacing: 0rem;
`;

export const RegisterPage = () => {
<<<<<<< HEAD
    const error = useSelector(state => state.auth.error);
    const isLoading = useSelector(state => state.auth.isLoading);
    const dispatch = useDispatch();
    const submit = React.useRef();

    const handleSubmit = () => {
        submit.current.click();
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },

        onSubmit: (values) => {
            dispatch(register(values));
        },
        validationSchema: RegisterValidationSchema,
    });

    return (
        <Container className="mt-5">
            <div className="ocean">
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
            </div>
            <Col className="d-flex justify-content-center">
                <Form id="myform" className="myform shadow" onSubmit={formik.handleSubmit}>
                    <div className="logo mb-3">
                        <div className="col-md-12 text-center">
                            <Title>Rewind</Title>
                            <Header>REGISTER</Header>
                        </div>
                    </div>
                    {error &&
                        <Alert variant="danger">{error}</Alert>
                    }
                    <FormGroup className="form-group">
                        <Label className="form-label">Email</Label>
                        {formik.touched.email && formik.errors.email &&
                            <Alert variant="danger">{formik.errors.email}</Alert>}
                        <input type="text"
                            name="email"
                            className={"form-control " + classNames(formik.touched.email
                                && !formik.errors.email
                                && "is-valid",
                                formik.touched.email
                                && formik.errors.email
                                && "is-invalid")}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            id="email"
                            placeholder="Enter Email"
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label className="form-label">Password</Label>
                        {formik.touched.password && formik.errors.password &&
                            <Alert variant="danger">{formik.errors.password}</Alert>}
                        <input type="password"
                            name="password"
                            id="password"
                            className={"form-control " + classNames(formik.touched.password
                                && !formik.errors.password
                                && "is-valid",
                                formik.touched.password
                                && formik.errors.password
                                && "is-invalid")}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Enter Password" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label className="form-label">Confirm password</Label>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                            <Alert variant="danger">{formik.errors.confirmPassword}</Alert>}
                        <input type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className={"form-control " + classNames(formik.touched.confirmPassword
                                && !formik.errors.confirmPassword
                                && "is-valid",
                                formik.touched.confirmPassword
                                && formik.errors.confirmPassword
                                && "is-invalid")}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Confirm Password" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <p className="text-center">By signing up you accept our <a href="#TermsOfUse">Terms Of Use</a></p>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <div className="col-md-12 text-center ">
                            <a onClick={handleSubmit} className="btn-flip mb-3" data-back="Register" data-front="Register"></a>
                            <button ref={submit} form="myform" type="submit" style={{ display: 'none' }}></button>
                        </div>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <p className="text-center">Already have account? <a href="#signin">Sign in here</a></p>
                    </FormGroup>
                </Form>
=======
    return (
        <Container className="mt-5">
            <div className="ocean">
                <div className="wave"/>
                <div className="wave"/>
                <div className="wave"/>
            </div>
            <Col className="d-flex justify-content-center">
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
                                    <Title>Rewind</Title>
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
                                        <a href="#" className="btn-flip mb-3" data-back="Login" data-front="Login"></a>
                                    </div>
                                    {/*<Button type="submit" className="btn-block btn-dark shadow-none">Register</Button>*/}
                                    {/*<div className="svg-wrapper">*/}
                                    {/*    <svg height="40" width="150" xmlns="http://www.w3.org/2000/svg">*/}
                                    {/*        <rect id="shape" height="40" width="150"/>*/}
                                    {/*        <div id="text">*/}
                                    {/*            <a href=""><span className="spot"></span>Button 1</a>*/}
                                    {/*        </div>*/}
                                    {/*    </svg>*/}
                                    {/*</div>*/}

                            </FormGroup>
                            <FormGroup className="form-group">
                                <p className="text-center">Already have account? <a href="#signin">Sign in here</a></p>
                            </FormGroup>
                        </Form>);
                    }}
                </Formik>
>>>>>>> e6b5fce2d1545897eea074ead5d8f553a7025017
            </Col>
        </Container>
    )
}

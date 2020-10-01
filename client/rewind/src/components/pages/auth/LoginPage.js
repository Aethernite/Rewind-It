import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { FormGroup, Container, Col, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import classNames from 'classnames';
import '../../../css/forms.scss';
import {LoginValidationSchema} from "../../../validations/schemas/LoginValidationSchema";

const FormLabel = styled.label`
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

const Logo = styled.h1`
  font-family: 'Lobster', cursive;
  letter-spacing: 0.2rem;
  font-size: 4rem;
  transition: transform 0.2s;

&:hover{
    transform: scale(1.2);
    cursor: pointer;
}
`;

const Header = styled.h2`
font-family: 'Roboto', sans-serif;
font-weight: 300;
font-size: 2rem;
letter-spacing: 0rem;
`;

const LoginPage = () => {

    ///const error = useSelector(state => state.auth.error);
    ///const isLoading = useSelector(state => state.auth.isLoading);
    ///const dispatch = useDispatch();
    const error = "Error Invalid Login!";

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },

        onSubmit: (values) => {
            console.log("Submitting");
        },
        validationSchema: LoginValidationSchema,
    });


    return (
        <Container className="mt-5">
            <div className="ocean">
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
            </div>
            <Col className="d-flex justify-content-center">
                <Form onSubmit={formik.handleSubmit}>
                    <div className="logo mb-3">
                        <div className="col-md-12 text-center">
                            <Logo>Rewind</Logo>
                            <Header>LOGIN</Header>
                        </div>
                        {error && <Alert variant="danger">{error}</Alert>
                        }
                    </div>
                    <FormGroup>
                        <FormLabel className="form-label">Username</FormLabel>
                        <input
                            type="text"
                            name="username"
                            className={"form-control " + classNames(formik.touched.username && !formik.errors.username && 'is-valid', formik.touched.username && formik.errors.username && 'is-invalid')}
                            id="username"
                            placeholder="Enter Username"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel className="form-label">Password</FormLabel>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className={"form-control " + classNames(formik.touched.password && !formik.errors.password && 'is-valid', formik.touched.password && formik.errors.password && 'is-invalid')}
                            placeholder="Enter Password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <p className="text-center">By signing up you accept our <a href="#TermsOfUse">Terms Of Use</a></p>
                    </FormGroup>
                    <div className="col-md-12 text-center ">
                        <a href="#" class="btn-flip mb-3" data-back="Login" data-front="Login"></a>
                    </div>
                    <div className="form-group">
                        <p className="text-center">Don't have account? <a href="#signup">Sign up here</a></p>
                    </div>
                </Form>
            </Col>
        </Container >
    );
}
export default LoginPage;
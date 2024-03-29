import React from "react";
import {Col, Container, Button, Spinner} from "react-bootstrap";
import styled from "styled-components";
import moment from "moment";
import {Week} from "../../common/Week";
import "../../../css/forms.scss"
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { clearTimesheet, createTimesheet } from "../../../store/slices/timesheet";
import { Timesheet } from '../../Timesheet.js';

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

const Header = styled.h2`
font-family: 'Roboto', sans-serif;
font-weight: 300;
font-size: 2rem;
letter-spacing: 0rem;
margin-bottom: 2rem;
`;

const StyledButton = styled(Button)`
  margin-top: 2rem;
  background-color: cornflowerblue;
  border-radius: 10px;
`;

export const CreateTimesheet = () => {
    const isCreating = useSelector(state => state.timesheet.isCreating);

    let fullWeek = [];
    let monday = moment()
        .day("Monday").subtract(7, 'd');
    let sunday = moment()
        .day("Sunday").add(7, 'd').subtract(7, 'd');

    for (let i = 0; i < 4; i++) {
        fullWeek.push(monday.format("DD/MM/YYYY") + " - " + sunday.format("DD/MM/YYYY"));
        monday.add(7, 'd');
        sunday.add(7, 'd');
    }

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(clearTimesheet());
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            period: ''
        },

        onSubmit: (values) => {
            const splitted = values.period.split(" - ");
            const from = splitted[0];
            const to = splitted[1];
            dispatch(createTimesheet({from, to}));
        },
    });
    
    const timesheet = useSelector(state => state.timesheet.timesheet);
    if (!timesheet) {
        return (
            <Container className="mt-5">
                <Col className="d-flex justify-content-center">
                    <Form onSubmit={formik.handleSubmit}>
                        <div className="col-md-12 text-center">
                            <Header>Create new timesheet:</Header>
                        </div>

                        <div>
                            <select name="period" title="Choose week" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange}>
                                <option value=''>Choose week...</option>            
                                <Week key={"last"} week={fullWeek[0]} index={0} />
                                <Week key={"now"} week={fullWeek[1]} index={1}/>
                                <Week key={"next"} week={fullWeek[2]} index={2}/>
                                <Week key={"after-next"} week={fullWeek[3]} index={3}/>
                            </select>
                        </div>
                        <StyledButton hidden={isCreating} disabled={formik.values.period === ''}
                                      type="submit">Next</StyledButton>
                        <div className="d-flex justify-content-center pt-2">
                            <Spinner hidden={!isCreating} animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    </Form>
                </Col>
            </Container>
        )
    } else {
        return (
            <Timesheet></Timesheet>
        );
    }
}

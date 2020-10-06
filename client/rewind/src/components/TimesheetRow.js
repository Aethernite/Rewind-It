import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import styled from 'styled-components';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { TimesheetRowValidationSchema } from "../validations/schemas/TimesheetRowValidationSchema";
import Select from 'react-select';
import {addActivity, deleteActivity, fetchTimesheet} from "../store/slices/timesheet";
import { setDay } from "../store/slices/timesheet";
import {fetchAllProjects} from "../store/slices/projects";
import moment from "moment";


const Table = styled.table`
border: 1px solid #2e2e2e;
border-bottom: none;
border-right: none;
border-left: none;
font-family: "Roboto", sans-serif;
background-color: #fff;
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

const sum = arr => {
    let sum = 0;
    arr.forEach(element => {
        sum += element;
    });

    return sum;
}

export const TimesheetRow = ({ hours ,submitted, activity, index }) => {
    const projects = useSelector(state => state.projects.projects);
    const timesheet = useSelector(state => state.timesheet.timesheet);
    const dispatch = useDispatch();
    const id = "row";
    const [selectedTaskOption, setSelectedTaskOption] = React.useState(activity?.task?.name);
    const [selectedProjectOption, setSelectedProjectOption] = React.useState(activity?.project?.name);
    const [currentId, setCurrentId] = React.useState(timesheet.id);

    // let temp = Object.assign({activities: timesheet.activities, statusType: timesheet.statusType, total: timesheet.total}, {activities: timesheet.activities, statusType: timesheet.statusType, total: timesheet.total});

    console.log(temp);

    const deleteActivityOfSheet = ({timesheetId, activityId}) => {
        dispatch(deleteActivity({timesheetId, activityId}));
    }

    React.useEffect(() => {
        dispatch(fetchAllProjects());

    }, [dispatch])

    const isSubmitted = submitted === "SUBMITTED";

    const projectOptions = [] = projects.filter(project => project.name != '').map((project) => project = { value: project.id, label: project.name });
    const taskOptions = [] = selectedProjectOption ? projects.filter(project => project.id === selectedProjectOption.value)[0]?.tasks.filter(task => task.name != '').map((task) => task = { value: task.id, label: task.name }) : [];

    const addOnChange = (day, value) => {
        console.log("Day: " + day);
        console.log("Value: " + value);
        console.log("Index: " + index);
        formik.values[day] = value;
        console.log("Formik value: " + formik.values[day])
        console.log("Activity id: " + activity.id);
        let dayDate = 0;
        switch (day) {
            case "monday":
                dayDate = 0;
                break;
            case "tuesday":
                dayDate = 1;
                break;
            case "wednesday":
                dayDate = 2;
                break;
            case "thursday":
                dayDate = 3;
                break;
            case "friday":
                dayDate = 4;
                break;
            case "saturday":
                dayDate = 5;
                break;
            case "sunday":
                dayDate = 6;
                break;
        }

        console.log("Activity date: " + moment(activity.timesheetDays[dayDate].date).format("YYYY-MM-DD"))

        temp.activities[index].timesheetDays[dayDate].hours = value;
        temp.activities[index].timesheetDays[dayDate].date = moment(activity.timesheetDays[dayDate].date).format("YYYY-MM-DD");
    }

    const formik = useFormik({
        initialValues: {
            project: '',
            task: '',
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: '',
            total: 0,
        },

        onSubmit: (values) => {
            values.total = (formik.values.monday !== '' ? parseFloat(formik.values.monday) : 0) +
                (formik.values.tuesday !== '' ? parseFloat(formik.values.tuesday) : 0) +
                (formik.values.wednesday !== '' ? parseFloat(formik.values.wednesday) : 0) +
                (formik.values.thursday !== '' ? parseFloat(formik.values.thursday) : 0) +
                (formik.values.friday !== '' ? parseFloat(formik.values.friday) : 0) +
                (formik.values.saturday !== '' ? parseFloat(formik.values.saturday) : 0) +
                (formik.values.sunday !== '' ? parseFloat(formik.values.sunday) : 0);
        },
        validationSchema: TimesheetRowValidationSchema,
    });

    const taskDefault = { value: '', label: "Choose Task..." };
    const projectDefault = { value: '', label: "Choose Project..." };

    const activities = timesheet.activities;

    const handleProjectChange = (e) => {

        if (activities.length === index + 1) {
            dispatch(addActivity());
        }

        setSelectedProjectOption(e);
        setSelectedTaskOption(null);
    }

    const handleTaskChange = (e) => {
        setSelectedTaskOption(e);
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit} id={id}>

            </form>
            <tr>
                <th>
                    <div className="mt-2">
                        {timesheet?.activities?.length > 1 && timesheet.activities.length -1 !== index && (<><span className="d-inline-block ml-1">{index}</span>
                        <Icon onClick={() => deleteActivityOfSheet({timesheetId: timesheet?.id, activityId: activity?.id})} className="d-inline-block fa fa-trash pl-2"></Icon></>)}
                    </div>
                </th>
                <td>
                    <Select
                        form={id}
                        theme="primary"
                        defaultValue={projectDefault}
                        onChange={handleProjectChange}
                        options={projectOptions}
                        value={selectedProjectOption || ''}
                        className="react-select"
                        isDisabled={isSubmitted}
                    />
                </td>
                <td>
                    <Select
                        form={id}
                        defaultValue={taskDefault}
                        onChange={handleTaskChange}
                        value={selectedTaskOption || ''}
                        options={taskOptions}
                        className="react-select"
                        isDisabled={isSubmitted}
                    />
                </td>
                <td>
                    <div>
                        <Input disabled={isSubmitted} name="monday" maxLength={4} className={`form-control ${formik.errors.monday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={(event) => addOnChange(event.target.name, event.target.value)} />
                        <Tippy content={formik.errors.monday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.monday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                            <i class="fas fa-info-circle" style={{ color: formik.errors.monday ? "red" : "#2e2e2e" }}></i>
                        </Tippy>
                    </div>

                </td>
                <td>
                    <Input disabled={isSubmitted} name="tuesday" maxLength={4} className={`form-control ${formik.errors.tuesday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={(event) => addOnChange(event.target.name, event.target.value)} />
                    <Tippy content={formik.errors.tuesday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.tuesday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.tuesday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td>
                <td>
                    <Input disabled={isSubmitted} name="wednesday" maxLength={4} className={`form-control ${formik.errors.wednesday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={(event) => addOnChange(event.target.name, event.target.value)} />
                    <Tippy content={formik.errors.wednesday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.wednesday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.wednesday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td >
                <td>
                    <Input disabled={isSubmitted} name="thursday" maxLength={4} className={`form-control ${formik.errors.thursday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={(event) => addOnChange(event.target.name, event.target.value)}  />
                    <Tippy content={formik.errors.thursday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.thursday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.thursday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td>
                <td>
                    <Input disabled={isSubmitted} name="friday" maxLength={4} className={`form-control ${formik.errors.friday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={(event) => addOnChange(event.target.name, event.target.value)} />
                    <Tippy content={formik.errors.friday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.friday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.friday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td>
                <td>
                    <Input disabled={isSubmitted} name="saturday" maxLength={4} className={`form-control ${formik.errors.saturday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={(event) => addOnChange(event.target.name, event.target.value)} />
                    <Tippy content={formik.errors.saturday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.saturday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.saturday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td>
                <td>
                    <Input disabled={isSubmitted} name="sunday" maxLength={4} className={`form-control ${formik.errors.sunday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={(event) => addOnChange(event.target.name, event.target.value)} />
                    <Tippy content={formik.errors.sunday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.sunday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.sunday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td>
                <td>{
                    sum([formik.values.monday,
                    formik.values.tuesday,
                    formik.values.wednesday,
                    formik.values.thursday,
                    formik.values.friday,
                    formik.values.saturday,
                    formik.values.sunday].filter(hour => !isNaN(hour)).map(Number))
                }
                </td>
            </tr>
        </>
    )
};

export default TimesheetRow;

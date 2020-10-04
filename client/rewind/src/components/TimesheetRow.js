import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import styled from 'styled-components';
import { useformik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { TimesheetRowValidationSchema } from "../validations/schemas/TimesheetRowValidationSchema";
import Select from 'react-select';

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

export const TimesheetRow = ({ activity, index, formik }) => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects.projects);

    const id = "row";
    const [selectedTaskOption, setSelectedTaskOption] = React.useState(activity.task);
    const [selectedProjectOption, setSelectedProjectOption] = React.useState(activity.project);

    const projectOptions = [] = projects.map((project, index) => project = { value: index, label: project.name });

    const taskOptions = [] = selectedProjectOption ? projects[selectedProjectOption.value].tasks.map(task => task = { value: task.id, label: task.name }) : [];

    const taskDefault = { value: '', label: "Choose Task..." };
    const projectDefault = { value: '', label: "Choose Project..." };

    const handleProjectChange = (e) => {
        setSelectedProjectOption(e);
        console.log(e);
        setSelectedTaskOption(null);
    }

    const handleTaskChange = (e) => {
        setSelectedTaskOption(e);
    }

    return (
        <>
            <tr>
                <th>
                    <div className="mt-2">
                        <span className="d-inline-block ml-1">{index}</span>
                        <Icon className="d-inline-block fa fa-trash pl-2"></Icon>
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
                        value={formik.values.timesheet.activities[0].project?.name}

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
                    />
                </td>
                <td >
                    <div>
                        <Input name="monday" value={activity.timesheetDays[0].hours} maxLength={4} className={`form-control ${formik.errors.monday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.monday} />
                        <Tippy content={formik.errors.activity ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.monday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                            <i class="fas fa-info-circle" style={{ color: formik.errors.monday ? "red" : "#2e2e2e" }}></i>
                        </Tippy>
                    </div>
                </td>
                <td>
                    <Input name="tuesday" maxLength={4} value={activity.timesheetDays[1].hours} className={`form-control ${formik.errors.tuesday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.tuesday} />
                    <Tippy content={formik.errors.tuesday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.tuesday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.tuesday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td>
                <td>
                    <Input name="wednesday" maxLength={4} value={activity.timesheetDays[2].hours} className={`form-control ${formik.errors.wednesday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.wednesday} />
                    <Tippy content={formik.errors.wednesday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.wednesday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.wednesday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td >
                <td>
                    <input name="thursday" maxLength={4} value={activity.timesheetDays[3].hours} className={`form-control ${formik.errors.thursday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.thursday} />
                    <Tippy content={formik.errors.thursday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.thursday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.thursday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td>
                <td>
                    <Input name="friday" maxLength={4} value={activity.timesheetDays[4].hours} className={`form-control ${formik.errors.friday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.friday} />
                    <Tippy content={formik.errors.friday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.friday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.friday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td>
                <td>
                    <Input name="saturday" maxLength={4} value={activity.timesheetDays[5].hours} className={`form-control ${formik.errors.saturday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.saturday} />
                    <Tippy content={formik.errors.saturday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.saturday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.saturday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td>
                <td>
                    <Input name="sunday" maxLength={4} value={activity.timesheetDays[6].hours} className={`form-control ${formik.errors.sunday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.sunday} />
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
                    <button type="submit" form="myform">ok</button>
                </td>
            </tr>

        </>
    )
};

export default TimesheetRow;

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

export const TimesheetRow = () => {
    const projects = useSelector(state => state.projects.projects);
    const dispatch = useDispatch();
    const id = "row";
    const [selectedTaskOption, setSelectedTaskOption] = React.useState(null);
    const [selectedProjectOption, setSelectedProjectOption] = React.useState(null);


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

    const projectOptions = [] = projects.map((project, index) => project = { value: index, label: project.name });

    const taskOptions = [] = selectedProjectOption ? projects[selectedProjectOption.value].tasks.map(task => task = { value: task.id, label: task.name }) : [];

    const taskDefault = { value: '', label: "Choose Task..." };
    const projectDefault = { value: '', label: "Choose Project..." };

    const handleProjectChange = (e) => {
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
                        <span className="d-inline-block ml-1">1</span>
                        <Icon className="d-inline-block fa fa-trash pl-2"></Icon>
                    </div>
                </th>
                <td>
                    <Select
                        theme="primary"
                        defaultValue={projectDefault}
                        onChange={handleProjectChange}
                        options={projectOptions}
                        value={selectedProjectOption || ''}
                    />
                </td>
                <td className="react-select">
                    <Select
                        defaultValue={taskDefault}
                        onChange={handleTaskChange}
                        value={selectedTaskOption || ''}
                        options={taskOptions}
                    />
                </td>
                <td >
                    <div>
                        <Input name="monday" maxLength={4} className={`form-control ${formik.errors.monday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.monday} />
                        <Tippy content={formik.errors.monday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.monday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                            <i class="fas fa-info-circle" style={{ color: formik.errors.monday ? "red" : "#2e2e2e" }}></i>
                        </Tippy>
                    </div>
                </td>
                <td>
                    <Input name="tuesday" maxLength={4} className={`form-control ${formik.errors.tuesday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.tuesday} />
                    <Tippy content={formik.errors.tuesday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.tuesday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.tuesday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td>
                <td>
                    <Input name="wednesday" maxLength={4} className={`form-control ${formik.errors.wednesday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.wednesday} />
                    <Tippy content={formik.errors.wednesday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.wednesday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.wednesday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td >
                <td>
                    <Input name="thursday" maxLength={4} className={`form-control ${formik.errors.thursday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.thursday} />
                    <Tippy content={formik.errors.thursday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.thursday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.thursday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td>
                <td>
                    <Input name="friday" maxLength={4} className={`form-control ${formik.errors.friday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.friday} />
                    <Tippy content={formik.errors.friday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.friday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.friday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td>
                <td>
                    <Input name="saturday" maxLength={4} className={`form-control ${formik.errors.saturday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.saturday} />
                    <Tippy content={formik.errors.saturday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.saturday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.saturday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td>
                <td>
                    <Input name="sunday" maxLength={4} className={`form-control ${formik.errors.sunday ? "is-invalid" : ""}`} form={id} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.sunday} />
                    <Tippy content={formik.errors.sunday ? "Only positive numbers allowed 0-24!" : "This input is for the work hours \n on a certain task!"} arrow={true} placement='bottom' theme={formik.errors.sunday ? "danger" : "dark"} style={{ display: "inline-block" }}>
                        <i class="fas fa-info-circle" style={{ color: formik.errors.sunday ? "red" : "#2e2e2e" }}></i>
                    </Tippy>
                </td>
                <td>{
                    (formik.values.monday !== '' ? parseFloat(formik.values.monday) : 0) +
                    (formik.values.tuesday !== '' ? parseFloat(formik.values.tuesday) : 0) +
                    (formik.values.wednesday !== '' ? parseFloat(formik.values.wednesday) : 0) +
                    (formik.values.thursday !== '' ? parseFloat(formik.values.thursday) : 0) +
                    (formik.values.friday !== '' ? parseFloat(formik.values.friday) : 0) +
                    (formik.values.saturday !== '' ? parseFloat(formik.values.saturday) : 0) +
                    (formik.values.sunday !== '' ? parseFloat(formik.values.sunday) : 0)
                }
                </td>
            </tr>
        </>
    )
};

export default TimesheetRow;

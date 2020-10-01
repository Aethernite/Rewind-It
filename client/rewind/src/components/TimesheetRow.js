import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import styled from 'styled-components';

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
float: right;


&:hover{
    transform: scale(1.2);
    cursor: pointer;
    color: red;
}
`;

export const TimesheetRow = () => {


    return (
        <tr>
            <th>
                <div className="mt-2">
                    <span className="d-inline-block ml-1">1</span>
                    <Icon className="d-inline-block fa fa-trash pl-2"></Icon>
                </div>
            </th>
            <td>
                <select className="form-control">
                    <option>Google Timesheet Project</option>
                </select>
            </td>
            <td>
                <select className="form-control">
                    <option>Learning</option>
                </select>
            </td>
            <td >
                <div>
                    <Input maxLength={4} className="form-control is-invalid" />
                    <Tippy content="Only numbers from 1-24 allowed!" arrow={true} placement='bottom' theme="danger" style={{ display: "inline-block" }}>
                        <i class="fas fa-exclamation-circle" style={{ color: 'red' }}></i>
                    </Tippy>
                </div>
            </td>
            <td>
                <Input maxLength={4} className="form-control" />
                <Tippy content="Only numbers from 1-24 allowed!" arrow={true} placement='bottom' theme="danger" style={{ display: "inline-block" }}>
                    <i class="fas fa-exclamation-circle"></i>
                </Tippy>
            </td>
            <td>
                <Input maxLength={4} className="form-control" />
                <Tippy content="Only numbers from 1-24 allowed!" arrow={true} placement='bottom' theme="danger" style={{ display: "inline-block" }}>
                    <i class="fas fa-exclamation-circle"></i>
                </Tippy>
            </td >
            <td>
                <Input maxLength={4} className="form-control" />
                <Tippy content="Only numbers from 1-24 allowed!" arrow={true} placement='bottom' theme="danger" style={{ display: "inline-block" }}>
                    <i class="fas fa-exclamation-circle"></i>
                </Tippy>
            </td>
            <td>
                <Input maxLength={4} className="form-control" />
                <Tippy content="Only numbers from 1-24 allowed!" arrow={true} placement='bottom' theme="danger" style={{ display: "inline-block" }}>
                    <i class="fas fa-exclamation-circle"></i>
                </Tippy>
            </td>
            <td>
                <Input maxLength={4} className="form-control" />
                <Tippy content="Only numbers from 1-24 allowed!" arrow={true} placement='bottom' theme="danger" style={{ display: "inline-block" }}>
                    <i class="fas fa-exclamation-circle"></i>
                </Tippy>
            </td>
            <td>
                <Input maxLength={4} className="form-control" />
                <Tippy content="Only numbers from 1-24 allowed!" arrow={true} placement='bottom' theme="danger" style={{ display: "inline-block" }}>
                    <i class="fas fa-exclamation-circle"></i>
                </Tippy>
            </td>
            <td>10</td>
        </tr>
    )
};

export default TimesheetRow;

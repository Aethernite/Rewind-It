import React from "react";
import DropdownItem from "react-bootstrap/DropdownItem";

export const Week = ({ week }) => {
    return (
        <option value={week}>{week}</option>
    )
}
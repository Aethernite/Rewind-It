import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { checkIfExists } from "../../store/slices/timesheet";

export const Week = ({ week, index }) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(checkIfExists({week, index}));
    },[dispatch, week, index]);

    const exists = useSelector(state => state.timesheet.exists[index]);
    
    return (
    <option value={week}>{week}{exists ? " already exists" : ""}</option>
    )
}
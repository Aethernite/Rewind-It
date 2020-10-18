import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { checkIfExists } from "../../store/slices/timesheet";

export const Week = ({ week, index }) => {
    const dispatch = useDispatch();
    React.useEffect( () => {
        async function checkExists() {
            await dispatch(checkIfExists({week, index}));
        }

        checkExists();

    },[dispatch, week, index]);

    const exists = useSelector(state => state.timesheet.exists[index]);
    
    return (
    <option value={week}>{week}{exists ? " already exists" : ""}</option>
    )
}
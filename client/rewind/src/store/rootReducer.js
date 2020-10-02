import { combineReducers } from 'redux';
import { authReducer } from './slices/auth';
import { timesheetReducer } from './slices/timesheet';
const rootReducer = combineReducers({
    auth: authReducer,
    timesheet: timesheetReducer,
});
export { rootReducer };

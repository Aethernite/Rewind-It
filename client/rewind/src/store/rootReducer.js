import { combineReducers } from 'redux';
import { authReducer } from './slices/auth';
import { timesheetReducer } from './slices/timesheet';
import {projectsReducer} from "./slices/projects";
import {tasksReducer} from "./slices/tasks";

const rootReducer = combineReducers({
    auth: authReducer,
    timesheet: timesheetReducer,
    projects: projectsReducer,
    tasks: tasksReducer
});

export { rootReducer };

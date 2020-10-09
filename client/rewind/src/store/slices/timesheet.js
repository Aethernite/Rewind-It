import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/AuthQueries';
import moment from 'moment';

const initialState = {
    timesheet: null,
    error: null,
    isCreating: false,
    isDeleting: false,
    mondayTotal: 0,
    tuesdayTotal: 0,
    wednesdayTotal: 0,
    thursdayTotal: 0,
    fridayTotal: 0,
    saturdayTotal: 0,
    sundayTotal: 0,
    total: 0,
    isFetching: false
};

const { reducer: timesheetReducer, actions } = createSlice({
    name: 'timesheet',
    initialState,
    reducers: {
        createTimesheetStart: (state) => {
            state.isCreating = true;
        },
        createTimesheetSuccess: (state, action) => {
            state.isCreating = false;
            state.timesheet = action.payload;
            state.creationError = null;
        },
        createTimesheetFailure: (state, action) => {
            state.isCreating = false;
            state.creationError = action.payload;
        },
        deleteCurrentTimesheetStart: (state) => {
            state.isDeleting = true;
        },
        deleteCurrentTimesheetSuccess: (state) => {
            state.isDeleting = false;
            state.timesheet = null;
        },
        deleteCurrentTimesheetFailure: (state, action) => {
            state.isDeleting = false;
            state.error = action.payload;
        },
        addCurrentTimesheetActivityStart: (state) => {
            state.isCreating = true;
        },
        addCurrentTimesheetActivitySuccess: (state, action) => {
            state.isCreating = false;
            console.log(action.payload);
            state.timesheet.activities.push(action.payload[action.payload.length - 1]);
            state.error = null;
        },
        addCurrentTimesheetActivityFailure: (state, action) => {
            state.isCreating = false;
            state.timesheet.error = action.payload;
        },
        submitTimesheetStart: (state) => {
            state.isCreating = true;
        },
        submitTimesheetSuccess: (state, action) => {
            state.isCreating = false;
            state.timesheet = action.payload;
            state.creationError = null;
        },
        submitTimesheetFailure: (state, action) => {
            state.isCreating = false;
            state.creationError = action.payload;
        },
        saveTimesheetStart: (state) => {
            state.isCreating = true;
        },
        saveTimesheetSuccess: (state, action) => {
            state.isCreating = false;
            // state.timesheet = action.payload;
            state.creationError = null;
        },
        saveTimesheetFailure: (state, action) => {
            state.isCreating = false;
            state.creationError = action.payload;
        },
        fetchTimesheetStart: (state) => {
            state.isFetching = true;
        },
        fetchTimesheetSuccess: (state, action) => {
            state.isFetching = false;
            state.timesheet = action.payload;
            state.creationError = null;
        },
        fetchTimesheetFailure: (state, action) => {
            state.isFetching = false;
            state.creationError = action.payload;
        },
        deleteActivityStart: (state) => {
            state.isFetching = true;
        },
        deleteActivitySuccess: (state, action) => {
            state.isFetching = false;
            // state.timesheet.activities
            state.timesheet.activities = state.timesheet.activities.filter(activity => activity.id !== action.payload);

            state.creationError = null;
        },
        deleteActivityFailure: (state, action) => {
            state.isFetching = false;
            state.creationError = action.payload;
        },
        saveProjectStart: (state) => {
            state.isCreating = true;
        },
        saveProjectSuccess: (state, action) => {
            state.isCreating = false;
            // state.timesheet.activities
            console.log(action.payload);
            state.timesheet.activities[action.payload.index].project.name = action.payload.project;
            state.timesheet.activities[action.payload.index].project.id = action.payload.id;

            state.creationError = null;
        },
        saveProjectFailure: (state, action) => {
            state.isCreating = false;
            state.creationError = action.payload;
        },
        saveTaskStart: (state) => {
            state.isCreating = true;
        },
        saveTaskSuccess: (state, action) => {
            state.isCreating = false;
            // state.timesheet.activities
            console.log(action.payload);
            state.timesheet.activities[action.payload.index].task.name = action.payload.task;
            state.timesheet.activities[action.payload.index].task.id = action.payload.id;

            state.creationError = null;
        },
        saveTaskFailure: (state, action) => {
            state.isCreating = false;
            state.creationError = action.payload;
        },
        saveDayStart: (state) => {
            state.isCreating = true;
        },
        saveDaySuccess: (state, action) => {
            state.isCreating = false;
            // state.timesheet.activities
            // console.log(action.payload);
            state.timesheet.activities[action.payload.index].timesheetDays[action.payload.day].date = action.payload.date;
            state.timesheet.activities[action.payload.index].timesheetDays[action.payload.day].hours = action.payload.value;

            let monday = 0;
            state.timesheet.activities.forEach((activity) => monday += +activity.timesheetDays[0].hours);
            state.mondayTotal = monday;

            let tuesday = 0;
            state.timesheet.activities.forEach((activity) => tuesday += +activity.timesheetDays[1].hours);
            state.tuesdayTotal = tuesday;

            let wednesday = 0;
            state.timesheet.activities.forEach((activity) => wednesday += +activity.timesheetDays[2].hours);
            state.wednesdayTotal = wednesday;

            let thursday = 0;
            state.timesheet.activities.forEach((activity) => thursday += +activity.timesheetDays[3].hours);
            state.thursdayTotal = thursday;

            let friday = 0;
            state.timesheet.activities.forEach((activity) => friday += +activity.timesheetDays[4].hours);
            state.fridayTotal = friday;

            let saturday = 0;
            state.timesheet.activities.forEach((activity) => saturday += +activity.timesheetDays[5].hours);
            state.saturdayTotal = saturday;

            let sunday = 0;
            state.timesheet.activities.forEach((activity) => sunday += +activity.timesheetDays[6].hours);
            state.sundayTotal = sunday;

            state.total = monday + tuesday + wednesday + thursday + friday + saturday + sunday;

            state.creationError = null;
        },
        saveDayFailure: (state, action) => {
            state.isCreating = false;
            state.creationError = action.payload;
        },
        reset: () => {
            return initialState;
        },
    },
});

export const createTimesheet = ({ from, to }) => {
    return async (dispatch) => {
        dispatch(actions.createTimesheetStart());
        try {
            const split = from.split(/\//);
            const format = split[2] + "-" + split[1] + "-" + split[0];
            const timesheet = await api.createTimesheet({ fromDate: format });

            let a = timesheet.activities[0].timesheetDays.map(day => {
                day.date = moment(day.date).format("YYYY-MM-DD");
            })
            // console.log(a);
            dispatch(actions.createTimesheetSuccess(timesheet));
        } catch (err) {
            dispatch(actions.createTimesheetFailure(err?.response?.data?.message));
        }
    }

};

export const deleteCurrentTimesheet = () => {
    return async (dispatch, getState) => {
        const id = getState().timesheet.timesheet.id;
        dispatch(actions.deleteCurrentTimesheetStart());
        try {
            await api.deleteTimesheet({id});
            dispatch(actions.deleteCurrentTimesheetSuccess());
        } catch (err) {
            dispatch(actions.deleteCurrentTimesheetFailure());
        }
    }
}

export const addActivity = () => {
    return async (dispatch, getState) => {
        const id = getState().timesheet.timesheet.id;
        // console.log(id);
        dispatch(actions.addCurrentTimesheetActivityStart());
        try {
            const result = await api.addActivityToTimesheet({ id });
            console.log(result.activities);

            let a = result.activities.map(activity => activity.timesheetDays.map(day => {
                day.date = moment(day.date).format("YYYY-MM-DD");
            }))

            // console.log(a);
            //     [result.activities.length - 1]

            dispatch(actions.addCurrentTimesheetActivitySuccess(result.activities));
        } catch (error) {
            dispatch(actions.addCurrentTimesheetActivityFailure(error?.response?.data?.message));
        }
    }
}

export const deleteActivity = ({timesheetId, activityId}) => {
    return async (dispatch, getState) => {
        // const timesheetId = getState().timesheet.timesheet.id;
        dispatch(actions.deleteActivityStart());
        try {
            await api.deleteActivityOfTimesheet({timesheetId, activityId});

            dispatch(actions.deleteActivitySuccess(activityId));
        } catch (error) {
            dispatch(actions.deleteActivityFailure(error?.response?.data?.message));
        }
    }
}

export const clearTimesheet = () => {
    return async (dispatch) => {
        dispatch(actions.reset());
    }
}

export const submitCurrentTimesheet = () => {
    return async (dispatch, getState) => {
        const id = getState().timesheet.timesheet.id;
        dispatch(actions.submitTimesheetStart());
        try {
            await api.submitTimesheet({id});
            dispatch(actions.submitTimesheetSuccess());
        } catch (error) {
            actions.submitTimesheetFailure(error?.response?.data?.message)
        }
    }
}

export const saveCurrentTimesheet = () => {
    return async (dispatch, getState) => {
        const id = getState().timesheet.timesheet.id;
        dispatch(actions.saveTimesheetStart());
        try {
            const activities = getState().timesheet.timesheet.activities.slice(0, getState().timesheet.timesheet.activities.length);
            const statusType = getState().timesheet.timesheet.statusType;
            const total = getState().timesheet.total;

            await api.saveTimesheet({id, activities, statusType, total});

            dispatch(actions.saveTimesheetSuccess());
        } catch (error) {
            actions.saveTimesheetFailure(error?.response?.data?.message)
        }
    }
}

export const fetchTimesheet = ({id}) => {
    return async (dispatch) => {
        dispatch(actions.fetchTimesheetStart());
        try {
            const result = await api.fetchTimesheetById({ id });

            result.activities.forEach(activity => activity.timesheetDays.forEach(day => {
                day.date = moment(day.date).format("YYYY-MM-DD");
            }))

            dispatch(actions.fetchTimesheetSuccess(result));
        } catch (error) {
            dispatch(actions.fetchTimesheetFailure(error?.response?.data?.message));
        }
    }
}

export const saveProjectInStore = ({project, id, index}) => {
    return async (dispatch) => {
        dispatch(actions.saveProjectStart());
        try {
            dispatch(actions.saveProjectSuccess({project, id, index}));
        } catch (error) {
            dispatch(actions.saveProjectFailure())
        }
    }
}

export const saveTaskInStore = ({task, id, index}) => {
    return async (dispatch) => {
        dispatch(actions.saveTaskStart());
        try {
            dispatch(actions.saveTaskSuccess({task, id, index}));
        } catch (error) {
            dispatch(actions.saveTaskFailure())
        }
    }
}

export const saveDayInStore = ({day, value, date, index}) => {
    return async (dispatch) => {
        dispatch(actions.saveDayStart());
        try {
            dispatch(actions.saveDaySuccess({day, value, date, index}));
        } catch (error) {
            dispatch(actions.saveDayFailure())
        }
    }
}

export const resetTimesheet = actions.reset;

export { timesheetReducer };

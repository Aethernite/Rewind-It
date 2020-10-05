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
            state.timesheet.activities.push(action.payload);
        },
        addCurrentTimesheetActivityFailure: (state, action) => {
            state.isCreating = false;
            // state.timesheet.error = action.payload;
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
            state.timesheet = action.payload;
            state.creationError = null;
        },
        saveTimesheetFailure: (state, action) => {
            state.isCreating = false;
            state.creationError = action.payload;
        },
        fetchTimesheetStart: (state) => {
            debugger;
            state.isFetching = true;
        },
        fetchTimesheetSuccess: (state, action) => {
            debugger;
            state.isFetching = false;
            state.timesheet = action.payload;
            state.creationError = null;
        },
        fetchTimesheetFailure: (state, action) => {
            state.isFetching = false;
            state.creationError = action.payload;
        },
        setMonday: (state, action) => {
            state.mondayTotal = action.payload.total;
        },
        setTuesday: (state, action) => {
            state.tuesdayTotal = action.payload.total;
        },
        setWednesday: (state, action) => {
            state.wednesdayTotal = action.payload.total;
        },
        setThursday: (state, action) => {
            state.thursdayTotal = action.payload.total;
        },
        setFriday: (state, action) => {
            state.fridayTotal = action.payload.total;
        },
        setSaturday: (state, action) => {
            state.saturdayTotal = action.payload.total;
        },
        setSunday: (state, action) => {
            state.sundayTotal = action.payload.total;
        },
        clearTimesheet: (state, action) => {
            state.timesheet = null;
        }

        // authStart: (state) => {
        //     state.isLoading = true;
        // },
        // authSuccess: (state, action) => {
        //     state.isLoading = false;
        //     state.user = action.payload;
        //     state.error = null;
        // },
        // authFailure: (state, action) => {
        //     state.isLoading = false;
        //     state.user = null;
        //     state.error = action.payload;
        // },
        // markSessionChecked: state => {
        //     state.isSessionChecked = true;
        // },
        // registerStart: (state) => {
        //     state.isLoading = true;
        //     state.error = null;
        // },
        // registerSuccess: (state, action) => {
        //     state.isLoading = false;
        //     state.user = action.payload;
        //     state.error = null;
        // },
        // registerFailure: (state, action) => {
        //     state.isLoading = false;
        //     state.user = null;
        //     state.error = action.payload;
        // },
        // clearErrors: (state) => {
        //     state.error = null;
        // },
        // logoutStart: (state) => {
        //     state.isLoading = true;
        //     state.error = null;
        // },
        // logoutSuccess: (state, action) => {
        //     state.isLoading = false;
        //     state.user = null;
        //     state.error = null;
        // },
        // logoutFailure: (state, action) => {
        //     state.isLoading = false;
        //     state.user = null;
        //     state.error = action.payload;
        // },
    },
});

//Actions

export const createTimesheet = ({ from, to }) => {
    return async (dispatch) => {
        dispatch(actions.createTimesheetStart());
        try {
            const split = from.split(/\//);
            const format = split[2] + "-" + split[1] + "-" + split[0];
            const timesheet = await api.createTimesheet({ fromDate: format });
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
            await api.deleteTimesheet({ id });
            dispatch(actions.deleteCurrentTimesheetSuccess());
        } catch (err) {
            dispatch(actions.deleteCurrentTimesheetFailure());
        }
    }
}

export const addActivity = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(actions.addCurrentTimesheetActivityStart());
            dispatch(actions.addCurrentTimesheetActivitySuccess(payload));
        } catch (error) {
            dispatch(actions.addCurrentTimesheetActivityFailure(error?.response?.data?.message));
        }
    }
}

export const clearTimesheet = () => {
    return async (dispatch) => {
        dispatch(actions.clearTimesheet());
    }
}

export const submitCurrentTimesheet = () => {
    return async (dispatch, getState) => {
        const id = getState().timesheet.timesheet.id;
        dispatch(actions.submitTimesheetStart());
        try {
            await api.submitTimesheet({ id });
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
            const result = await api.saveTimesheet({ id });
            dispatch(actions.submitTimesheetSuccess());
        } catch (error) {
            actions.saveTimesheetFailure(error?.response?.data?.message)
        }
    }
}

export const fetchTimesheet = ({ id }) => {
    return async (dispatch) => {
        dispatch(actions.fetchTimesheetStart());
        try {
            const result = await api.fetchTimesheetById({ id });
            dispatch(actions.fetchTimesheetSuccess(result));
        } catch (error) {
            dispatch(actions.fetchTimesheetFailure(error?.response?.data?.message));
        }
    }
}

export const setDay = ({ day, total }) => {
    return async (dispatch) => {
        switch (day) {
            case "Monday":
                dispatch(actions.setMonday(total));
                break;
            case "Tuesday":
                dispatch(actions.setTuesday(total));
                break;
            case "Wednesday":
                dispatch(actions.setWednesday(total));
                break;
            case "Thursday":
                dispatch(actions.setThursday(total));
                break;
            case "Friday":
                dispatch(actions.setFriday(total));
                break;
            case "Saturday":
                dispatch(actions.setSaturday(total));
                break;
            case "Sunday":
                dispatch(actions.setSaturday(total));
        }
    }

}

export { timesheetReducer };

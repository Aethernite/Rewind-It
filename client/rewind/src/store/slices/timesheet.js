import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/AuthQueries';
import moment from 'moment';

const initialState = {
    timesheet: null,
    error: null,
    isCreating: false,
    isDeleting: false,
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

};

export { timesheetReducer };

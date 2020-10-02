import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/AuthQueries';

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
        createPostFailure: (state, action) => {
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
        const timesheet = { from: from, to: to };
        dispatch(actions.createTimesheetSuccess(timesheet));
    }

};

export const deleteCurrentTimesheet = () => {
    return async (dispatch) => {
        dispatch(actions.deleteCurrentTimesheetStart());
        dispatch(actions.deleteCurrentTimesheetSuccess());
    }

};

export { timesheetReducer };
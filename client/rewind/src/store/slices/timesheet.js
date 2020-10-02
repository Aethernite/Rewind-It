import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/AuthQueries';

const initialState = {
    timesheet: [{
        timesheetRows: [{
            project: null,
            task: null,
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0,
        }
        ]
    },
        rows
    ],
    iscreating,
    creationError,
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
            state.timesheet.push(action.payload);
            state.creationError = null;
        },
        createPostFailure: (state, action) => {
            state.isCreating = false;
            state.creationError = action.payload;
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

export const createTimesheet = (values) => {
    return async (dispatch, getState) => {

        try {
            dispatch(actions.createTimesheetStart());
            //const user = await api.register({ email, password });

            dispatch(actions.createTimesheetSuccess(user));
        } catch (err) {
            dispatch(actions.registerFailure(err?.response?.data?.message));
        }
    }

};

export const login = ({ email, password }) => {
    return async (dispatch, getState) => {
        const isLoading = getState().auth.isLoading;
        if (isLoading) {
            return
        }

        try {
            dispatch(actions.authStart());
            const user = await api.login({ email, password });
            dispatch(actions.authSuccess(user));
        } catch (err) {
            dispatch(actions.authFailure(err?.response?.data?.message));
        }
    }

};

export const logout = () => {
    return async (dispatch, getState) => {
        const isLoading = getState().auth.isLoading;
        if (isLoading) {
            return
        }

        try {
            dispatch(actions.logoutStart());
            await api.logout();
            dispatch(actions.logoutSuccess());
        } catch (err) {
            dispatch(actions.logoutFailure(err?.response?.data?.message));
        }
    }

};

export const clearErrors = () => {
    return async (dispatch) => {
        dispatch(actions.clearErrors());
    }
}

export { authReducer };

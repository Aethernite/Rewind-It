import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/AuthQueries';

const initialState = {
    timesheets: [],
    error: null,
    isCreating: false,
    isDeleting: false,
    limit: 5,
};

const { reducer: timesheetsReducer, actions } = createSlice({
    name: 'timesheets',
    initialState,
    reducers: {
        fetchTimesheetsStart: (state) => {
            state.isLoading = true;
        },
        fetchTimesheetsSuccess: (state, action) => {
            state.isLoading = false;
            state.timesheets = action.payload.timesheets;
            state.error = null;
        },
        fetchTimesheetsFailure: (state, action) => {
            state.isLoading = false;
            state.timesheets = [];
            state.error = action.payload;
        },
    },
});

//Actions
export const fetchUserTimesheets = ({ cursor }) => {
    return async (dispatch, getState) => {
        const { limit } = getState().timesheets;
        try {
            dispatch(actions.fetchTimesheetsStart());
            const timesheets = await api.getTimesheetsForUser({ cursor, limit });
            dispatch(actions.fetchTimesheetsSuccess({ timesheets, cursor }));
        } catch (err) {
            console.log(err);
            dispatch(actions.fetchTimesheetsFailure(err?.response?.data?.message));
        }
    }
};


export { timesheetsReducer };


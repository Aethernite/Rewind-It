import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/AuthQueries';

const initialState = {
    timesheets: null,
    error: null,
    isCreating: false,
    isDeleting: false,
    cursor: null,
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
            state.timesheets.push(...action.payload.results.filter((x) => !state.timesheets.some((timesheet) => timesheet.id === x.id)));
            state.error = null;
            state.cursor = action.payload.cursor;
        },
        fetchTimesheetsFailure: (state, action) => {
            state.isLoading = false;
            state.timesheets = [];
            state.error = action.payload;
        },
    },
});

//Actions
export const fetchUserTimesheets = (userId) => {
    return async (dispatch, getState) => {
        const { cursor, limit } = getState().timesheets;
        try {
            dispatch(actions.fetchTimesheetsStart());
            const { results, cursor: nextCursor } = await api.getTimesheetsForUser({ userId, cursor, limit });
            dispatch(actions.fetchTimesheetsSuccess({ results, cursor: nextCursor }));
        } catch (err) {
            dispatch(actions.fetchTimesheetsFailure(err?.response?.data?.message));
        }
    }
}





export { timesheetsReducer };

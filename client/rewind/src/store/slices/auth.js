import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/AuthQueries';


const initialState = {
    user: null,
    isLoading: false,
    error: null,
    isSessionChecked: false,
};

const { reducer: authReducer, actions } = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStart: (state) => {
            state.isLoading = true;
        },
        authSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
        },
        authFailure: (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
        },
        markSessionChecked: state => {
            state.isSessionChecked = true;
        },
        registerStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
        },
        registerFailure: (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
        logoutStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        logoutSuccess: (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = null;
        },
        logoutFailure: (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
        },
    },
});

//Actions

export const register = ({ email, password }) => {
    return async (dispatch, getState) => {
        const isLoading = getState().auth.isLoading;
        console.log("REGISTER");
        if (isLoading) {
            return
        }

        try {
            dispatch(actions.registerStart());
            const user = await api.register({ email, password });
            dispatch(actions.registerSuccess(user));
        } catch (err) {
            dispatch(actions.registerFailure(err?.response?.data?.message));
        }
    }

};

export const clearErrors = () => {
    return async (dispatch) => {
        dispatch(actions.clearErrors());
    }
}

export { authReducer };

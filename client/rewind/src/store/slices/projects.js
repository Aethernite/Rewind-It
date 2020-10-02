import {createSlice} from "@reduxjs/toolkit";
import {fetchProjects} from "../../api/ProjectsQueries";

const initialState = {
    projects: [],
    isLoading: false,
    errors: null,
    page: 0,
    size: 10,
};

const { reducer: projectsReducer, actions } = createSlice({
    name: "projects",
    initialState,
    reducers: {
        fetchProjectsStart: (state) => {
            state.isLoading = true;
        },
        fetchProjectsSuccess: (state, action) => {
            state.isLoading = false;
            state.projects.push(...action.payload.results);
            state.error = null;
            state.cursor = action.payload.page;
        },
        fetchProjectsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        fetchTasksForProjectStart: (state) => {
            state.isLoading = true;
        },
        fetchTasksForProjectSuccess: (state, action) => {
            state.isLoading = false;
            state.projects.push(...action.payload.results);
            state.error = null;
            state.cursor = action.payload.page;
        },
        fetchTasksForProjectFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        reset: () => {
            return initialState;
        }
    }
});

export const fetchAllProjects = () => {
    return async (dispatch, getState) => {
        const { page, size } = getState().projects;

        try {
            dispatch(actions.fetchProjectsStart());

            const results = await fetchProjects({
                page,
                size,
            });

            dispatch(actions.fetchProjectsSuccess({results}));
        } catch (error) {
            dispatch(actions.fetchProjectsFailure(error?.response?.data?.message));
        }
    };
}

export const resetProjects = actions.reset;

export {projectsReducer};

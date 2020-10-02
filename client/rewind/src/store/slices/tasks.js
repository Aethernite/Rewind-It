import {createSlice} from "@reduxjs/toolkit";
import {fetchProjectById, fetchProjects} from "../../api/ProjectsQueries";

const initialState = {
    tasks: [],
    error: null,
    isCreating: false,
    isDeleting: false,
}

const {reducer: tasksReducer, actions} = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        fetchTasksForProjectStart: (state) => {
            state.isLoading = true;
        },
        fetchTasksForProjectSuccess: (state, action) => {
            state.isLoading = false;
            state.tasks.push(...action.payload.tasks);
            state.error = null;
        },
        fetchTasksForProjectFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        reset: () => {
            return initialState;
        }
    }
})

export const fetchAllTasksForProject = (id) => {
    return async (dispatch) => {

        try {
            dispatch(actions.fetchTasksForProjectStart());

            const project = await fetchProjectById(id);

            dispatch(actions.fetchTasksForProjectSuccess(project));
        } catch (error) {
            dispatch(actions.fetchTasksForProjectFailure(error?.response?.data?.message));
        }
    };
}

export const resetTasks = actions.reset;

export {tasksReducer};
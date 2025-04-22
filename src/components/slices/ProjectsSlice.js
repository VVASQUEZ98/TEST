import { createSlice } from '@reduxjs/toolkit'

const projectsSlice = createSlice({
    name: 'projects ',
    initialState: [],
    reducers: {
        addProject(state, action) {
            state.push(action.payload);
        },
        removeProject(state, action) {
            state.splice(action.payload, 1);
        },
        setProjects(state, action) {
            state.length = 0;
            state.push([...action.payload])
        }
    }
})

export const { addProject, setProjects, removeProject } = projectsSlice.actions
export default projectsSlice.reducer
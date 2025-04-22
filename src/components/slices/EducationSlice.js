import { createSlice } from '@reduxjs/toolkit'

const educationSlice = createSlice({
    name: 'education',
    initialState: [],
    reducers: {
        addEducation(state, action) {
            state.push(action.payload);
        },
        removeEducation(state, action) {
            state.splice(action.payload, 1);
        },
        setEducations(state, action) {
            state.length = 0;
            state.push([...action.payload])
        },
        replaceEducation(state, action) {
            state[action.payload.index] = action.payload.item;
        }
    }
})

export const { addEducation, setEducation, removeEducation, replaceEducation  } = educationSlice.actions
export default educationSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const experienceSlice = createSlice({
    name: 'experience',
    initialState: [],
    reducers: {
        addExperience(state, action) {
            state.push(action.payload);
        },
        removeExperience(state, action) {
            state.splice(action.payload, 1);
        },
        replaceExperience(state, action) {
            state[action.payload.index] = action.payload.item;
        }
    }
})

export const { addExperience, setExperience, removeExperience, replaceExperience  } = experienceSlice.actions
export default experienceSlice.reducer
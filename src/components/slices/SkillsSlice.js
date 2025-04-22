import { createSlice } from '@reduxjs/toolkit'

const skillsSlice = createSlice({
    name: 'skills',
    initialState: [],
    reducers: {
        addSkills(state, action) {
            state.push(action.payload);
        },
        removeSkills(state, action) {
            state.splice(action.payload, 1);
        },
        setskills(state, action) {
            state.length = 0;
            state.push([...action.payload])
        },
        replaceSkill(state, action) {
            state[action.payload.index] = action.payload.item;
        }
    }
})

export const { addSkills, setskills, removeSkills, replaceSkill  } = skillsSlice.actions
export default skillsSlice.reducer
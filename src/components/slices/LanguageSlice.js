import { createSlice } from '@reduxjs/toolkit'

const languageSlice = createSlice({
    name: 'language',
    initialState: [],
    reducers: {
        addLanguage(state, action) {
            state.push(action.payload);
        },
        removeLanguage(state, action) {
            state.splice(action.payload, 1);
        },
        replaceLanguage(state, action) {
            state[action.payload.index] = action.payload.item;
        }
    }
})

export const { addLanguage, setLanguage, removeLanguage, replaceLanguage  } = languageSlice.actions
export default languageSlice.reducer
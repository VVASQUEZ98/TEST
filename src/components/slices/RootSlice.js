import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        font: ''
    },
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        remove(state, action) {
            state.splice(action.payload, 1);
        },
        setFont(state, action){
            state.font = action.payload;
        }
    }
})

export const { setFont } = rootSlice.actions
export default rootSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const referenceSlice = createSlice({
    name: 'reference',
    initialState: [],
    reducers: {
        addReference(state, action) {
            state.push(action.payload);
        },
        removeReference(state, action) {
            state.splice(action.payload, 1);
        },
        replaceReference(state, action) {
            state[action.payload.index] = action.payload.item;
        }
    }
})

export const { addReference, removeReference, replaceReference  } = referenceSlice.actions
export default referenceSlice.reducer
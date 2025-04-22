import { createSlice } from '@reduxjs/toolkit'

const contactSlice = createSlice({
    name: 'contact',
    initialState: [],
    reducers: {
        addContact(state, action) {
            state.push(action.payload);
        },
        removeContact(state, action) {
            state.splice(action.payload, 1);
        },
        replaceContact(state, action) {
            state[action.payload.index] = action.payload.item;
        }
    }
})

export const { addContact, setContact, removeContact, replaceContact  } = contactSlice.actions
export default contactSlice.reducer
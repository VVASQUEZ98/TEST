import { createSlice } from '@reduxjs/toolkit'

const completitionSlice = createSlice({
    name: 'completition',
    initialState: {},
    reducers: {
        register(state, action) {
            state[action.payload] = 0;
        },
        reduce(state, action) {
            state[action.payload] = 0;
        },
        add(state, action) {
            state[action.payload] = 1;
        }
    },
    selectors: {
        validValue(state) {
            const valid = Object.values(state).reduce((x, y) => x + y, 0);
            const length = Object.values(state).length;

            if (length === 0) {
                return 0;
            }
            return (valid / length) * 100;
        },
        completed(state) {
            const valid = Object.values(state).reduce((x, y) => x + y, 0);
            const length = Object.values(state).length;

            if (length === 0) {
                return 0;
            }

            return length === valid;
        }
    }
})

export const { register, reduce, add } = completitionSlice.actions
export const { validValue, completed } = completitionSlice.selectors
export default completitionSlice.reducer
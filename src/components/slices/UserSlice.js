import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        nombre: '',
        titulo: '',
        email: '',
        telefono: '',
        valid: false,
        finished: false,
        image: null
    },
    reducers: {
        set(state, action) {
            state.email = action.payload.email;
            state.nombre = action.payload.nombre;
            state.telefono = action.payload.telefono;
            state.titulo = action.payload.titulo;
        },
        setImage(state, action) {
            state.image = action.payload
        },
        unsetImage(state, action) {
            state.image = null;
        },
        setValid(state, action) {
            state.valid = action.payload;
        },
        setFinished(state, action) {
            state.finished = action.payload;
        },
        reset(state, action) {
            state = { user: null, valid: false, finished: false, image: null }
        }
    },
    selectors: {
        userImage(state) {
            return state.image;
        },
        isEditable(state) {
            return !state.finished;
        },
        isValid (state) {
            return state.valid;
        }
    }
})

export const { set, reset, setValid, setFinished, setImage } = userSlice.actions
export const { isEditable, userImage, isValid } = userSlice.selectors
export default userSlice.reducer
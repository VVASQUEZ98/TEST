import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { combineReducers, configureStore } from '@reduxjs/toolkit';


import ProjectReducer from './slices/ProjectsSlice'
import SkillsReducer from './slices/SkillsSlice'
import EducationReducer from './slices/EducationSlice'
import UserReducer from './slices/UserSlice'
import CompletitionReducer from './slices/CompletitionSlice'
import ExperienceReducer from './slices/ExperienceSlice'
import ContactReducer from './slices/ContactSlice'
import LanguageReducer from './slices/LanguageSlice'
import RootReducer from './slices/RootSlice';
import ReferenceReducer from './slices/ReferenceSlice';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';

const persistConfig = {
    key: 'root',
    storage,
    hardSet
}

const combinedReducers = combineReducers({
    root: RootReducer,
    projects: ProjectReducer,
    skills: SkillsReducer,
    education: EducationReducer,
    user: UserReducer,
    completition: CompletitionReducer,
    experience: ExperienceReducer,
    contact: ContactReducer,
    language: LanguageReducer,
    reference: ReferenceReducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

const persist = persistStore(store);
export { store, persist }
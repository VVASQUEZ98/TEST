import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ProjectReducer from './slices/ProjectsSlice'
import SkillsReducer from './slices/SkillsSlice'
import EducationReducer from './slices/EducationSlice'
import UserReducer from './slices/UserSlice'
import CompletitionReducer from './slices/CompletitionSlice'
import ExperienceReducer from './slices/ExperienceSlice'
import ContactReducer from './slices/ContactSlice'
import LanguageReducer from './slices/LanguageSlice'
import RootReducer from './slices/RootSlice';

const combinedReducers = combineReducers({
    root: RootReducer,
    projects: ProjectReducer,
    skills: SkillsReducer,
    education: EducationReducer,
    user: UserReducer,
    completition: CompletitionReducer,
    experience: ExperienceReducer,
    contact: ContactReducer,
    language: LanguageReducer
})

const store = configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export {
    combinedReducers,
    store
}
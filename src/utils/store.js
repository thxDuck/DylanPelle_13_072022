import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from "../features/authentication"

export default configureStore({
    reducer: {
        authentication: authenticationReducer,
    },
})
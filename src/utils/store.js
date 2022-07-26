import { configureStore } from '@reduxjs/toolkit'
// import authenticationReducer from "../features/authentication"
import userReducer from "../features/user"

export default configureStore({
    reducer: {
        user: userReducer,
    },
})
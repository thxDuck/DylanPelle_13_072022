import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/user"
import accountReducer from "../features/account"

export default configureStore({
    reducer: {
        user: userReducer,
        accounts: accountReducer,
    },
})
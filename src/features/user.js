import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: {
        id: 0,
        firstName: "",
        lastName: "",
    },
    loggedIn: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    // reducers permet de définir les actions et le reducer
    reducers: {
        // l'action toggle ('theme/toggle')
        editNames: (state, action) => {
            return action.payload
        },
    },
})

// on extrait les actions et le reducer
const { actions, reducer } = userSlice
// on export chaque action individuellement
export const { editNames } = actions
// on export le reducer comme default export
export default reducer
import { createSlice } from "@reduxjs/toolkit";
import { selectUserStatus } from "../utils/selectors";
import { login } from "../utils/services";

const initialState = {
	user: {
		id: 0,
		firstName: "",
		lastName: "",
		token: "",
		accountIds: [],
	},
	// Satus can be "void", "pending", "connected";
	status: "void",
};


export function loginUser(email, password, keepLogged) {
	return async (dispatch, getState) => {
		const status = selectUserStatus(getState()).status;
		if (status === "pending" || status === "updating") {
			return;
		}
		dispatch(actions.checkCredentials(email, password, keepLogged));
		try {
			console.log("1 - Send login !");
			// FIXME Ici j'ai des soucis de passage d'erreur/résultats, VOIR la modification du payload dans le reducer ! :/
			const token = await login(email, password);
			dispatch(actions.resolved(token));
		} catch (error) {
			console.log('CATCH');
			console.log('error => ', error);
			
			dispatch(actions.rejected(error));
		}
	};
}
const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		checkCredentials: {
			prepare: (userName, password, keepLogged) => ({
				payload: { userName, password, keepLogged },
			}),
			reducer: (draft, action) => {
				if (draft.status === "void") {
					draft.status = "pending";
					return;
				}
				if (draft.status === "rejected") {
					draft.error = null;
					draft.status = "pending";
					return;
				}
				if (draft.status === "resolved") {
					draft.status = "updating";
					return;
				}
			},
		},
		resolved: {
			// prepare permet de modifier le payload
			prepare: (token) => ({
				payload: { token:token },
			}),
			// la fonction de reducer
			reducer: (draft, action) => {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.user.token = action.payload.token;
					draft.status = "resolved";
					return;
				}
				return;
			},
		},
		rejected: {
			prepare: (error) => ({
				payload: { error },
			}),
			reducer: (draft, action) => {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.error = action.payload.error;
					draft.data = null;
					draft.status = "rejected";
					return;
				}
				return;
			},
		},
	},
});

// on extrait les actions et le reducer
const { actions, reducer } = userSlice;
// on export chaque action individuellement
export const { editNames } = actions;
// on export le reducer comme default export
export default reducer;

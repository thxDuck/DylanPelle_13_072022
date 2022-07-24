import { createSlice } from "@reduxjs/toolkit";
import { selectAuthenticationStatus } from "../utils/selectors";
import { login } from "../utils/services";

const initialState = {
	status: "void",
	error: false,
	token: "",
};

export function checkCredentials(email, password, keepLogged) {
	return async (dispatch, getState) => {
		const status = selectAuthenticationStatus(getState()).status;
		if (status === "pending" || status === "updating") {
			return;
		}
		dispatch(actions.checkCredentials(email, password, keepLogged));
		try {
			const token = await login(email, password);
			if (!!token) dispatch(actions.resolved(token));
			else dispatch(actions.rejected());
			return !!token;
		} catch (error) {
			dispatch(actions.rejected(error));
		}
	};
}
const authenticationSlice = createSlice({
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
				payload: { token: token },
			}),
			// la fonction de reducer
			reducer: (draft, action) => {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.authentication.token = action.payload.token;
					draft.status = "resolved";
					return;
				}
				return;
			},
		},
		rejected: {
			reducer: (draft, action) => {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.token = "";
					draft.error = true;
					draft.status = "rejected";
					return;
				}
				return;
			},
		},
	},
});

// on extrait les actions et le reducer
const { actions, reducer } = authenticationSlice;
// on export chaque action individuellement
export const { editNames } = actions;
// on export le reducer comme default export
export default reducer;

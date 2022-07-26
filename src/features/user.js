import { createSlice } from "@reduxjs/toolkit";
import { selectUserStatus } from "../utils/selectors";
import { getToken, getProfile } from "../utils/services";

const emptyUser = {
	id: "",
	firstName: "",
	lastName: "",
	email: "",
	updatedAt: "",
};
const initialState = {
	data: { ...emptyUser },
	mode: null,
	connected: false,
	status: "void",
	error: false,
	token: "",
	keepLogged: false,
};
export const setMode = (mode) => {
	return (dispatch, getState) => {
		console.log({ mode });
		dispatch(actions.setMode(mode));
	};
};
export const logout = () => {
	return (dispatch, getState) => {
		dispatch(actions.logout());
	};
};
export const login = (email, password, keepLogged) => {
	return async (dispatch, getState) => {
		const status = selectUserStatus(getState()).status;
		if (status === "pending" || status === "updating") {
			return;
		}
		dispatch(actions.checkCredentials(email, password, keepLogged));
		const response = await getToken(email, password);
		if (response.success) {
			const token = response.token;
			await getProfile(token).then((response) => {
				if (response.success) {
					const user = response.user;
					// TODO : Initialiser des cookies de connexion au rememberme
					dispatch(actions.resolved(user, token, keepLogged));
				} else {
					const error = response.message || "Erreur de connexion.";
					dispatch(actions.rejected(error));
				}
			});
		} else {
			const error = response.message || "Erreur de connexion.";
			dispatch(actions.rejected(error));
		}
	};
};
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
					draft.user = { ...emptyUser };
					return;
				}
				if (draft.status === "resolved") {
					draft.status = "updating";
					draft.user = { ...emptyUser };
					return;
				}
			},
		},
		resolved: {
			prepare: (user, token, keepLogged) => ({
				payload: { user: user, token: token, keepLogged: keepLogged },
			}),
			reducer: (draft, action) => {
				if (
					draft.status === "pending" ||
					draft.status === "updating" ||
					draft.status === "rejected"
				) {
					draft.status = "resolved";
					draft.data = { ...action.payload.user };
					draft.keepLogged = action.payload.keepLogged;
					draft.token = action.payload.token;
					draft.error = false;
					draft.connected = true;
					return;
				}
				return;
			},
		},
		setMode: (draft, action) => {
			draft.mode = action.payload;
			return;
		},
		rejected: {
			prepare: (errorMessage) => ({
				payload: { error: errorMessage },
			}),
			reducer: (draft, action) => {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.token = "";
					draft.error = action.payload.error;
					draft.status = "rejected";
					draft.user = { ...emptyUser };
					return;
				}
				return;
			},
		},
		logout: {
			reducer: (draft, action) => {
				draft.token = "";
				draft.error = false;
				draft.status = "void";
				draft.user = { ...emptyUser };
				return;
			},
		},
	},
});

const { actions, reducer } = userSlice;
export const { editNames } = actions;
export default reducer;

import { createSlice } from "@reduxjs/toolkit";
import { selectUserStatus } from "../utils/selectors";
import { getToken, fetchProfile } from "../utils/services";
import * as Authentication from "../utils/autentication.js";

const emptyUser = {
	id: "",
	firstName: "",
	lastName: "",
	email: "",
	updatedAt: "",
	accountIds: [],
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
export const getUser = () => {
	return async (dispatch, getState) => {
		const status = selectUserStatus(getState());
		if (status === "pending" || status === "updating") return;
		const token = Authentication.getSavedLoginInformations();
		const response = await fetchProfile(token);
		if (response.success) {
			const user = response.user;
			dispatch(actions.resolved(user, token));
		} else {
			// console.error("Error in getUser :", response.message);
			dispatch(actions.rejected());
		}
	};
};
const getProfile = async (dispatch, actions, token) => {
	const response = await fetchProfile(token);
	if (response.success) {
		const user = response.user;
		dispatch(actions.resolved(user, token));
	} else {
		const error = response.message || "Connection error.";
		dispatch(actions.rejected(error));
		return false;
	}
};
export const login = (email, password, keepLogged) => {
	return async (dispatch, getState) => {
		const status = selectUserStatus(getState());
		if (status === "pending" || status === "updating") return;

		dispatch(actions.checkCredentials());
		const response = await getToken(email, password);
		if (response.success) {
			const token = response.token;
			const { newToken, secret } = Authentication.createLoginToken(token);
			Authentication.setTokenInformations(newToken, secret, keepLogged);			
			getProfile(dispatch, actions, token);
		} else {
			const error = response.message || "Connection error.";
			dispatch(actions.rejected(error));
		}
	};
};
const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		checkLogin: {
			reducer: (draft, action) => {
				draft.status = "updating";
				return;
			},
		},
		checkCredentials: {
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
			prepare: (user, token) => ({
				payload: { user: user, token: token },
			}),
			reducer: (draft, action) => {
				draft.status = "resolved";
				draft.data = action.payload.user;
				draft.token = action.payload.token;
				draft.error = false;
				draft.connected = true;
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
				draft.token = "";
				draft.error = action.payload.error;
				draft.status = "rejected";
				draft.user = { ...emptyUser };
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

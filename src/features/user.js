import { createSlice } from "@reduxjs/toolkit";
import { selectUserStatus } from "../utils/selectors";
import { getToken, fetchProfile } from "../utils/services";
import * as Autentication from "../utils/autentication.js";
import { useDispatch } from "react-redux";

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
		// TODO : Détruire les tokens ainsi que les accounts
		// TODO : Effacer aussi le keepLogged de localStorage
		dispatch(actions.logout());
	};
};

export const getUser = () => {
	return async (dispatch, getState) => {
		const user = getState().user;
		console.log({ user });
		let token = user.data.token;
		console.log({ token });
		if (!token) {
			const status = selectUserStatus(getState());
			if (status === "pending" || status === "updating") return;
			const { newToken, keepLogged } = await getConnectedUser();
			console.log({ newToken });
			if (!!newToken) {
				resolveUser(newToken, keepLogged);
				token = newToken;
				const { user } = await fetchUser(newToken);
				console.log({ user, newToken, keepLogged });
				dispatch(actions.resolved(user, newToken, keepLogged));
			} else {
				logout();
				dispatch(actions.rejected());
				return false;
			}
		} else {
			dispatch(actions.resolved(user, token, true));
		}
	};
};
const fetchUser = async (token) => {
	return await fetchProfile(token);
};
const getProfile = async (dispatch, actions, token, keepLogged) => {
	console.log("getProfile");
	const response = await fetchUser(token);
	console.log({ response });
	if (response.success) {
		const user = response.user;
			const { newToken, secret } = Autentication.createLoginToken(token);
			Autentication.setTokenInformations(newToken, secret, keepLogged);
			// console.log({ RESOLVED: user });
			dispatch(actions.resolved(user, token, keepLogged));
	} else {
		const error = response.message || "Connection error.";
		dispatch(actions.rejected(error));
		return false;
	}
	// await fetchProfile(token).then((response) => {
	// 	if (response.success) {
	// 		const user = response.user;
	// 		const { newToken, secret } = Autentication.createLoginToken(token);
	// 		Autentication.setTokenInformations(newToken, secret, keepLogged);
	// 		// console.log({ RESOLVED: user });
	// 		dispatch(actions.resolved(user, token, keepLogged));
	// 		return true;
	// 	} else {
	// 		const error = response.message || "Connection error.";
	// 		dispatch(actions.rejected(error));
	// 		return false;
	// 	}
	// });
};

export const resolveUser = (token, keepLogged) => {
	return (dispatch, getState) => {
		getProfile(dispatch, actions, token, keepLogged);
	};
};
export const getConnectedUser = async () => {
	const { token, keepLogged } = Autentication.getSavedLoginInformations();
	// console.log("     1.5.5 - getConnectedUser", { token });
	if (!!token) {
		resolveUser(token, keepLogged);
		return { newToken: token, keepLogged };
	} else {
		logout();
		return { token, keepLogged };
	}
};
export const login = (email, password, keepLogged) => {
	return async (dispatch, getState) => {
		const status = selectUserStatus(getState()).status;
		if (status === "pending" || status === "updating") return;

		dispatch(actions.checkCredentials());
		const response = await getToken(email, password);
		if (response.success) {
			const token = response.token;
			getProfile(dispatch, actions, token, keepLogged);
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

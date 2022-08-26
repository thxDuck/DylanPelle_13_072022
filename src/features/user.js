import { createSlice } from "@reduxjs/toolkit";
import { selectUserStatus, selectAccountIds } from "../utils/selectors";
import { getToken, fetchProfile, updateUserName } from "../utils/services";
import * as Authentication from "../utils/autentication.js";
import { clearAccounts } from "./account";

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

export const setMode = (mode) => {
	return (dispatch, getState) => {
		dispatch(actions.setMode(mode));
	};
};

export const logout = () => {
	return (dispatch, getState) => {
		Authentication.clearLoginInformations();
		dispatch(actions.logout());
		clearAccounts();
	};
};
export const getUser = () => {
	return async (dispatch, getState) => {
		const status = selectUserStatus(getState());
		if (status === "pending" || status === "updating") return;
		const token = Authentication.getSavedLoginInformations();
		if (!token) {
			dispatch(actions.rejected());
			return false;
		}
		const response = await fetchProfile(token);
		if (response.success) {
			const user = response.user;
			const accountsIds = selectAccountIds(getState());
			user.accountIds = accountsIds;
			dispatch(actions.resolved(user, token));
		} else dispatch(actions.rejected());
	};
};

export const editName = (firstName, lastName) => {
	return async (dispatch, getState) => {
		const token = Authentication.getSavedLoginInformations();
		if (!token) {
			dispatch(actions.rejected());
			return false;
		}
		const nameUpdated = await updateUserName(token, firstName, lastName);
		if (nameUpdated.success) dispatch(actions.editNameResolved(firstName, lastName));
		else dispatch(actions.onError("Error ! Name not updated !"));
	};
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
			Authentication.setLoginInformations(newToken, secret, keepLogged);
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
					draft.data = { ...emptyUser };
					return;
				}
				if (draft.status === "resolved") {
					draft.status = "updating";
					draft.data = { ...emptyUser };
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
				draft.data = { ...action.payload.user };
				draft.token = action.payload.token;
				draft.error = false;
				draft.connected = true;
				return;
			},
		},
		setMode: (draft, action) => {
			draft.mode = action.payload;
			draft.error = action.payload !== "error" ? false : draft.error;

			return;
		},
		editNameResolved: {
			prepare: (firstName, lastName) => ({
				payload: { firstName, lastName },
			}),
			reducer: (draft, action) => {
				draft.status = "resolved";
				draft.data.firstName = action.payload.firstName;
				draft.data.lastName = action.payload.lastName;
				draft.error = false;
				draft.mode = null;
				return;
			},
		},
		updating: (draft, action) => {
			draft.status = "updating";
			draft.error = false;
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
				draft.data = { ...emptyUser };
				return;
			},
		},
		onError: {
			prepare: (errorMessage) => ({
				payload: { error: errorMessage },
			}),
			reducer: (draft, action) => {
				draft.error = action.payload.error;
				draft.mode = "error";
				return;
			},
		},
		logout: {
			reducer: (draft, action) => {
				draft = initialState;
				return;
			},
		},
	},
});

const { actions, reducer } = userSlice;
export default reducer;

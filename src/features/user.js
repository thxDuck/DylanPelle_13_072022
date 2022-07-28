import { createSlice } from "@reduxjs/toolkit";
import { selectUserStatus } from "../utils/selectors";
import { getToken, getProfile } from "../utils/services";
import * as Autentication from "../utils/autentication.js";

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
		dispatch(actions.logout());
	};
};
export const login = (email, password, keepLogged) => {
	return async (dispatch, getState) => {
		const status = selectUserStatus(getState()).status;
		if (status === "pending" || status === "updating") {
			return;
		}
		dispatch(actions.checkCredentials());
		/* 
		TODO : Séparer en deux fonction pour ici, 
		  	- Vérifier la présence d'un token, 
				- et si oui, on getProfile directement sans passer par getToken
				- Si non, on getToken

		*/
		const response = await getToken(email, password);
		if (response.success) {
			const token = response.token;
			await getProfile(token).then((response) => {
				if (response.success) {
					const user = response.user;
					const { newToken, secret } = Autentication.createLoginToken(token);
					const storage = keepLogged ? localStorage : sessionStorage;
					storage.token = newToken;
					document.cookie = `sId=${secret};`;
					console.log({ newToken, secret });

					// localStorage.setItem('token', "xxx")
					// localStorage.getItem('token')
					// sessionStorage.setItem('token', "xxx");
					// sessionStorage.getItem('token')
					/*
						- Créer un secret
						1 - Décomposer le token, le hasher, le sauvegarder,
						2 - on recompose et on récupere ça (on peut associer l'id de connexion a l'user)

					*/

					dispatch(actions.resolved(user, token, keepLogged));
				} else {
					const error = response.message || "Connection error.";
					dispatch(actions.rejected(error));
				}
			});
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

import { createSlice } from "@reduxjs/toolkit";
import {
	selectAccountStatus,
	selectUserData,
	selectUserId,
	selectUserStatus,
} from "../utils/selectors";
import { getConnectedUser, resolveUser, logout } from "./user";

const mockedAccounts = [
	{
		id: 1,
		title: "Title (0)",
		amount: "$0",
		amountDescription: "Available Balance",
	},
	{
		id: 2,
		title: "Title (0)",
		amount: "$0",
		amountDescription: "Available Balance",
	},
	{
		id: 3,
		title: "Title (0)",
		amount: "$0",
		amountDescription: "Available Balance",
	},
];
const mockedAccountsV2 = [
	{
		id: 1,
		title: "Argent Bank Checking (x8349)",
		amount: "$2,082.79",
		amountDescription: "Available Balance",
	},
	{
		id: 2,
		title: "Argent Bank Savings (x6712)",
		amount: "$10,928.42",
		amountDescription: "Available Balance",
	},
	{
		id: 3,
		title: "Argent Bank Credit Card (x8349)",
		amount: "$184.30",
		amountDescription: "Current Balance",
	},
];

const initialState = {
	status: "void",
	error: false,
	data: mockedAccounts,
};
export const fetchUserAccounts = () => {
	return async (dispatch, getState) => {
		const status = getState().accounts.status;
		if (status === "resolved" || status === "pending" || status === "updating") return;
		let token = getState().user.data.token;
		if (!token) {
			const status = selectUserStatus(getState());
			if (status === "pending" || status === "updating") return;
			const { newToken, keepLogged } = await getConnectedUser();
			if (!!newToken) {
				resolveUser(newToken, keepLogged);
				token = newToken;
				dispatch(actions.fetchAccounts());
				setTimeout(() => {
					dispatch(actions.resolved(mockedAccountsV2));
					return mockedAccountsV2;
				}, 2000);
			} else {
				logout();
				dispatch(actions.rejected(mockedAccountsV2));
				return false;
			}
		} else {
			dispatch(actions.fetchAccounts());
			setTimeout(() => {
				dispatch(actions.resolved(mockedAccountsV2));
				return mockedAccountsV2;
			}, 2000);
		}
		// if (!token) {
		// 	dispatch(actions.rejected(mockedAccountsV2));
		// 	return false;
		// }
		// console.log("3 - fetchAccounts");
		// dispatch(actions.fetchAccounts());
		// setTimeout(() => {
		// 	dispatch(actions.resolved(mockedAccountsV2));
		// 	return mockedAccountsV2;
		// }, 2000);
	};
};
const accountSlice = createSlice({
	name: "accounts",
	initialState: initialState,
	reducers: {
		fetchAccounts: {
			reducer: (draft, action) => {
				if (draft.status === "void") {
					draft.status = "pending";
					draft.error = null;
					return;
				}
				if (draft.status === "updating") {
					draft.status = "pending";
					draft.error = null;
					return;
				}
				if (draft.status === "rejected") {
					draft.error = null;
					draft.status = "pending";
					draft.data = [];
					return;
				}
				if (draft.status === "resolved") {
					draft.status = "updating";
					return;
				}
			},
		},
		resolved: {
			prepare: (accounts) => ({
				payload: { accounts: accounts },
			}),
			reducer: (draft, action) => {
				if (
					draft.status === "pending" ||
					draft.status === "updating" ||
					draft.status === "rejected"
				) {
					draft.status = "resolved";
					draft.data = action.payload.accounts;
					draft.error = null;
					return;
				}
				return;
			},
		},
		rejected: {
			prepare: (errorMessage) => ({
				payload: { error: errorMessage },
			}),
			reducer: (draft, action) => {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.error = action.payload.error;
					draft.status = "rejected";
					draft.data = [];
					return;
				}
				return;
			},
		},
	},
});

const { actions, reducer } = accountSlice;
export const { editNames } = actions;
export default reducer;

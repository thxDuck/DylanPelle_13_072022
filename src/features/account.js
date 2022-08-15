import { createSlice } from "@reduxjs/toolkit";
import { selectAccountStatus, selectUserData, selectUserId } from "../utils/selectors";
import {checkLogin} from "./user";

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
		if (status === "resolved" ||status === "pending" || status === "updating") return;
		const userId = getState().user.data.id;
		console.log("   fetchUserAccounts: ", userId);
		if (!userId) {
			// await checkLogin().then((user) => console.log("		checkLogin result",{user}));
		}

		// dispatch(actions.fetchAccounts());
		// setTimeout(() => {
		// 	dispatch(actions.resolved(mockedAccountsV2));
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

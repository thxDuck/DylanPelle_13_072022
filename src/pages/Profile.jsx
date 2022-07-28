import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import HeaderProfile from "../components/profile/HeaderProfile.jsx";
import AccountResume from "../components/profile/AccountResume.jsx";
import * as accountActions from "../features/account";
import {
	selectUserData,
	userIsConnected,
	selectAccountsData,
	selectAccountStatus,
} from "../utils/selectors";

const mockedAccounts = [
	{
		id: 1,
		title: "",
		amount: "",
		amountDescription: "",
		mock: true,
	},
	{
		id: 2,
		title: "",
		amount: "",
		amountDescription: "",
		mock: true,
	},
	{
		id: 3,
		title: "",
		amount: "",
		amountDescription: "",
		mock: true,
	},
];
const Profile = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUserData);
	const userId = user.id;
	// const userId = document.cookie.userId
	// console.log({userId});
	const isConnected = useSelector(userIsConnected);

	useEffect(() => {
		if (isConnected) {
			dispatch(accountActions.fetchUserAccounts(userId));
		} else if (!!localStorage) {
			// recherche du token
				// => /login
		} else {
			// reconnectez vous
		}
	}, [dispatch, isConnected, userId]);

	const userAccounts = useSelector(selectAccountsData);
	const accountStatus = useSelector(selectAccountStatus);

	console.log("render");

	return !isConnected || !user || !user.id ? (
		<main className="main bg-dark">
			<div className="unauthorized">
				<p>You are not authenticated !</p>
				<Link to="/login">Sign In</Link>
			</div>
		</main>
	) : (
		<main className="main bg-dark">
			<HeaderProfile />
			<h2 className="sr-only">Accounts</h2>
			{accountStatus?.length > 0 ? (
				userAccounts.map((acc) => {
					return (
						<AccountResume
							key={acc.id}
							title={acc.title}
							amount={acc.amount}
							amountDescription={acc.amountDescription}
							mock={acc.mock}
						/>
					);
				})
			) : (
				<p className="error">Hey ;'</p>
			)}
		</main>
	);
};

export default Profile;

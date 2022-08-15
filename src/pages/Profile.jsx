import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import HeaderProfile from "../components/profile/HeaderProfile.jsx";
import AccountResume from "../components/profile/AccountResume.jsx";
import Loader from "../components/partials/Loader.jsx";
import * as accountActions from "../features/account";
import * as userActions from "../features/user";
import {
	selectUserData,
	userIsConnected,
	selectAccountsData,
	selectAccountStatus,
	userLoginStatus,
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
	const isConnected = useSelector(userIsConnected);
	const loginStatus = useSelector(userLoginStatus);
// TODO : Tout récupérer dans chackLogin, cela renverra alors l'user, ou alors une erreur 
	useEffect(() => {
		console.log({ userId });
		if (isConnected) {
			dispatch(accountActions.fetchUserAccounts(userId));
		} else {
			dispatch(userActions.checkLogin());
		}
	}, [dispatch, isConnected, userId]);

	const userAccounts = useSelector(selectAccountsData);
	const accountStatus = useSelector(selectAccountStatus);

	console.log("render profile");

	switch (loginStatus) {
		case "resolved":
			return (
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
		case "rejected":
			return (
				<main className="main bg-dark">
					<div className="unauthorized">
						<p>You are not authenticated !</p>
						<Link to="/login">Sign In</Link>
					</div>
				</main>
			);
		default:
			return (
				<main className="main bg-dark with_loader">
					<Loader color="#fff" />
				</main>
			);
	}

	// return loginStatus ? (
	// 	<main className="main bg-dark">
	// 		<div className="unauthorized">
	// 			<p>You are not authenticated !</p>
	// 			<Link to="/login">Sign In</Link>
	// 		</div>
	// 	</main>
	// ) : (
	// 	<main className="main bg-dark">
	// 		<HeaderProfile />
	// 		<h2 className="sr-only">Accounts</h2>
	// 		{accountStatus?.length > 0 ? (
	// 			userAccounts.map((acc) => {
	// 				return (
	// 					<AccountResume
	// 						key={acc.id}
	// 						title={acc.title}
	// 						amount={acc.amount}
	// 						amountDescription={acc.amountDescription}
	// 						mock={acc.mock}
	// 					/>
	// 				);
	// 			})
	// 		) : (
	// 			<p className="error">Hey ;'</p>
	// 		)}
	// 	</main>
	// );
};

export default Profile;

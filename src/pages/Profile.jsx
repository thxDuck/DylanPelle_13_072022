import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import HeaderProfile from "../components/profile/HeaderProfile.jsx";
import AccountResume from "../components/profile/AccountResume.jsx";
import Loader from "../components/partials/Loader.jsx";
import * as accountActions from "../features/account";
import { selectAccountsData, selectAccountStatus, selectUserStatus } from "../utils/selectors";

const Profile = () => {
	const accountStatus = useSelector(selectAccountStatus);
	const userAccounts = useSelector(selectAccountsData); //get user state
	const userStatus = useSelector(selectUserStatus); //get user state
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(accountActions.fetchUserAccounts());
	}, [dispatch]);

	console.log("Profile render :", { userStatus });

	return userStatus !== "rejected" ? (
		<main className="main bg-dark">
			<HeaderProfile />
			<h2 className="sr-only">Accounts</h2>
			{accountStatus !== "rejected" && accountStatus !== "resolved" ? (
				<Loader color="#fff" />
			) : (
				""
			)}
			{userAccounts.map((acc) => {
				return (
					<AccountResume
						key={acc.id}
						title={acc.title}
						amount={acc.amount}
						amountDescription={acc.amountDescription}
						mock={acc.mock}
					/>
				);
			})}
		</main>
	) : (
		<main className="main bg-dark">
			<div className="unauthorized">
				<p>You are not authenticated !</p>
				<Link to="/login">Sign In</Link>
			</div>
		</main>
	);
};

export default Profile;

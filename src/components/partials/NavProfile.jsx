import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../utils/selectors";
import * as userActions from "../../features/user";

const HeaderProfile = () => {
	const user = useSelector(selectUserData);
	const dispatch = useDispatch();

	console.log({user});

	const logout = () => {
		dispatch(userActions.logout())
	}
	return (
		<div>
			<a className="main-nav-item" href="./profile">
				<i className="fa fa-user-circle"></i>
				{ user.lastName }
			</a>
			<a className="main-nav-item" href="./" onClick={() => logout()}>
				<i className="fa fa-sign-out"></i>
				Sign Out
			</a>
		</div>
	);
};

export default HeaderProfile;

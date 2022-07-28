import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditName from "./EditName.jsx";
import { selectUserData, selectMode } from "../../utils/selectors";
import * as userActions from "../../features/user";
const HeaderProfile = () => {
	const dispatch = useDispatch();
	const [edit, setEdit] = useState(false);
	const mode = useSelector(selectMode);
	const user = useSelector(selectUserData);

	return (
		<div className="header">
			<h1>
				Welcome back
				<br />
				{user.firstName} {user.lastName} !
			</h1>
			{!mode ? (
				<button className="edit-button" onClick={() => dispatch(userActions.setMode("edit"))}>
					Edit Name
				</button>
			) : (
				<EditName />
			)}
		</div>
	);
};

export default HeaderProfile;

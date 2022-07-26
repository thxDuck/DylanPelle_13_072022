import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditName from "./EditName.jsx";
import { selectUserData } from "../../utils/selectors";
import * as userActions from "../../features/user";
const HeaderProfile = () => {
	const dispatch = useDispatch();
	const [edit, setEdit] = useState(false);
// TODO : Ici je dois récupérer les npm au début de l'édition, puis on fait les changements, envoie surn user etc... :) 
	const user = useSelector(selectUserData);
	const [userNames, setUserNames] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
	});

	const handleInputChange = (event) => {
		const target = event.target;
		const value = target.value.trim();
		const inputName = target.name;
		userNames[inputName] = value;
		setUserNames({ ...userNames, [inputName]: value });
	};

	const handleSumbmit = (event) => {
		event.preventDefault();
		console.log("Final names => ", userNames);
	};
	const handleReset = (event) => {
		event.preventDefault();
		setUserNames({
			firstName: user.firstName,
			lastName: user.lastName,
		});
		setEdit(false)
		console.log("Final names => ", userNames);
		// TODO : Quit edit mode !
	};

	console.log("user.mode => ", user.mode);
	return (
		<div className="header">
			<h1>
				Welcome back
				<br />
				{user.firstName} {user.lastName} !
			</h1>
			{!edit ? (
				<button className="edit-button" onClick={() => setEdit(true)}>
					Edit Name
				</button>
			) : (
				// <EditName />
				<form id="editProfile" onSubmit={handleSumbmit}>
					<div className="input-group">
						<input
							type="text"
							name="firstName"
							id="firstName"
							placeholder={user.firstName}
							value={user.firstName}
							onChange={handleInputChange}
						/>
						<input
							type="text"
							name="lastName"
							id="lastName"
							placeholder={user.lastName}
							value={user.lastName}
							onChange={handleInputChange}
						/>
					</div>
					<div className="btn-group">
						<button type="submit" className="btn edit-button">
							Save
						</button>
						<button type="reset" className="btn edit-button" onClick={handleReset}>
							Cancel
						</button>
					</div>
				</form>
			)}

			{/* */}
		</div>
	);
};

export default HeaderProfile;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../utils/selectors";

const EditName = () => {
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
		console.log("Final names => ", userNames);
		// TODO : Quit edit mode !
	};

	return (
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
	);
};

export default EditName;

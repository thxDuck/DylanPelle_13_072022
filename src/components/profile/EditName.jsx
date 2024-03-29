import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../features/user";
import { selectUserError, selectMode } from "../../utils/selectors";

const EditName = (props) => {
	const { firstName, lastName } = props;
	const dispatch = useDispatch();
	const mode = useSelector(selectMode);
	const error = useSelector(selectUserError);

	const [userName, setUserName] = useState({
		firstName: firstName || "",
		lastName: lastName || "",
	});
	const quitEdit = () => dispatch(userActions.setMode(""));

	if (!mode) quitEdit();

	const handleInputChange = (event) => {
		const target = event.target;
		const value = target.value.trim();
		const inputName = target.name;
		userName[inputName] = value;
		setUserName({ ...userName, [inputName]: value });
	};

	const handleSumbmit = (event) => {
		event.preventDefault();
		dispatch(userActions.editName(userName.firstName, userName.lastName));
	};
	
	const handleReset = (event) => {
		event.preventDefault();
		setUserName({
			firstName: "",
			lastName: "",
		});
		quitEdit();
	};

	return (
		<form id="editProfile" onSubmit={handleSumbmit}>
				{mode === "error" ? <p className="message-error">{error}</p> : ""}
			<div className="input-group">
				<input
					type="text"
					name="firstName"
					id="firstName"
					placeholder={firstName}
					value={userName.firstName}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="lastName"
					id="lastName"
					placeholder={lastName}
					value={userName.lastName}
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

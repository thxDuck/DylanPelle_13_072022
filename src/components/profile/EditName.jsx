import React, { useState } from "react";
const EditName = (props) => {
    const { firstName, lastName } = props;

    const [userNames, setUserNames] = useState({
        firstName: firstName,
        lastName: lastName,
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
            firstName: firstName,
            lastName: lastName,
        });
        console.log("Final names => ", userNames);
        // TODO : Quit edit mode !
    };

    return (
        <form id="editProfile" onSubmit={handleSumbmit}>
            <div className="input-group">
                <input type="text" name="firstName" id="firstName" placeholder={firstName} value={userNames.firstName} onChange={handleInputChange} />
                <input type="text" name="lastName" id="lastName" placeholder={lastName} value={userNames.lastName} onChange={handleInputChange} />
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

import React from "react";
import { useSelector } from "react-redux";
import EditName from "./EditName.jsx";
import { selectUserData } from "../../utils/selectors";

const HeaderProfile = () => {
    const user = useSelector(selectUserData);

    return (
        <div className="header">
            <h1>
                Welcome back
                <br />
                {user.firstName} {user.lastName} !
            </h1>
            {/* <EditName firstName="Tony" lastName="Jarvis" /> */}
            <button className="edit-button">Edit Name</button>
        </div>
    );
};

export default HeaderProfile;

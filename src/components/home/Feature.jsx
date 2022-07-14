import React from "react";
import chat from "../../assets/img/icon-chat.png";
import money from "../../assets/img/icon-money.png";
import security from "../../assets/img/icon-security.png";

const ICONS = {
    "icon-chat": chat,
    "icon-money": money,
    "icon-security": security,
};
const Feature = (props) => {
    const { title, description, iconName } = props;
    const icon = ICONS[iconName];
    return (
        <div className="feature-item">
            <img src={icon} alt="" className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Feature;

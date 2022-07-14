import React from "react";

const Input = (props) => {
    const { placeholder, type, id } = props;
    return <input id={id} type={type} placeholder={placeholder} />;
};

export default Input;

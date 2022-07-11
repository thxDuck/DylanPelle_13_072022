import React from 'react'
import EditName from './EditName.jsx'
const HeaderProfile = () => {
    return (
        <div className="header">
            <h1>Welcome back<br />Tony Jarvis!</h1>
             <EditName firstName="Tony" lastName="Jarvis" />
           {/*  <button className="edit-button">Edit Name</button> */}
        </div>
    )
}

export default HeaderProfile
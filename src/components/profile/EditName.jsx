import React from 'react'

// TODO : Créer plustot deux elements, un gauche et un droit 
const EditName = (props) => {
    const { firstName, lastName } = props;
    return (
        <form id="editProfile">
            <div className="input-group">
                <input type="text" name="firstName" id="firstName" placeholder={firstName} />
                <input type="text" name="lastName" id="lastName" placeholder={lastName} />
            </div>
            <div className="btn-group">
                <button type="submit" className="btn edit-button">Save</button>
                <button type="reset" className="btn edit-button">Cancel</button>

            </div>

        </form>
    )
}

export default EditName
import "./LogOut.css";
import React from "react";

function LogOut(props){

    const handleLogoutClick = () => {
        props.updateUserState(null, null, null, false);
    }

    return(
        <div>
            <button id="signOutText" onClick={handleLogoutClick}> Log out </button>
        </div>
    )
}

export default LogOut;
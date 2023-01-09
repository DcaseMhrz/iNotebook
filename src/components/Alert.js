import React, { useContext } from 'react'
import AlertContext from "../context/alert/AlertContext";


const Alert = () => {
    const { alertType, alertMessage } = useContext(AlertContext);

    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);

    }
    return (
        <div style={{ height: "60px" }}>
            {alertMessage!=="" && <div className={`alert alert-${alertType} col-md-3 mx-2`} role="alert">
                {capitalize(alertMessage)}
            </div>}
        </div>
    )
}

export default Alert
import React, { useState } from 'react'
import AlertContext from './AlertContext'

const AlertState = (props) => {
    
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const showAlert=(alertType,alertMessage)=>{
        setAlertType(alertType);
        setAlertMessage(alertMessage);
        setTimeout(() => {
            setAlertMessage("");
        }, 1500);
    }
    
  return (
    <AlertContext.Provider value={{ alertType, alertMessage,showAlert }}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState
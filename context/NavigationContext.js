import { createContext, useContext, useState } from "react";
import React from 'react';

const NavigationContext = createContext()

const NavigationProvider = ({children}) =>{
    const [navigationState, setNavigationState] = useState(true)
    const [userState, setuserState] = useState()

    return(
        <NavigationContext.Provider value={{navigationState,setNavigationState,userState, setuserState}} >
            {children}
        </NavigationContext.Provider>
    )
}

export const useNavigationState = () => useContext(NavigationContext)

export default NavigationProvider
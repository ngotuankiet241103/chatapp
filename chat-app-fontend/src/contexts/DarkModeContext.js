import React, { createContext, useContext, useState } from 'react';
const darkModeContext = createContext();
const DARKMODE_KEY = "isDarkMode";
const DarkModeProvider = (props) => {
    const storage = localStroge();
    const [isDarkMode,setIsDarkMode] = useState(storage.getItem(DARKMODE_KEY))
    const setDarkMode = (isDarkMode) => {
        storage.setItem(DARKMODE_KEY,isDarkMode)
        setIsDarkMode(isDarkMode)
    }
    const value = {
       isDarkMode,
       setDarkMode
       
    }
    return <darkModeContext.Provider value={{...value}} {...props} ></darkModeContext.Provider>;
};
const useDarkModeContext = () => {
    const context = useContext(darkModeContext);
    if(typeof context === "undefined") throw new Error("darkmode context is undifined");
    return context
}

const localStroge = () => {
    return {
        setItem: (key,value) => {
            localStorage.setItem(key,JSON.stringify(value))
        },
        getItem: (key) => {
            return JSON.parse(localStorage.getItem(key)) || ""
        }
    }
}
export {DarkModeProvider, useDarkModeContext};
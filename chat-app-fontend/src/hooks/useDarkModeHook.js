import React, { useState } from 'react';
const DARKMODE_KEY = "isDarkMode"
const useDarkModeHook = () => {
    const storage = localStroge();
    const [isDarkMode,setIsDarkMode] = useState(storage.getItem(DARKMODE_KEY))
    const setDarkMode = (isDarkMode) => {
        storage.setItem(DARKMODE_KEY,isDarkMode)
        setIsDarkMode(isDarkMode)
    }
    return {
        isDarkMode,
        setDarkMode

    }
};
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
export default useDarkModeHook;
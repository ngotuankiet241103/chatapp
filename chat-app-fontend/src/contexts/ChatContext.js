import useChatHook from "hooks/useChatHook";

const { createContext, useContext, useState } = require("react");

const chatPageContext = createContext();
const ChatProvider = (props) => {
    const {isSelected,focusUser} = useChatHook();
    const value = {
        isSelected,
        focusUser,
        ...props
    }
    return <chatPageContext.Provider value={{...value}} ></chatPageContext.Provider>;
};
const useChatContext = () => {
    const context = useContext(chatPageContext);
    if(typeof context === "undefined") throw new Error("authentication context is undifined");
    return context
}
export { useChatContext, ChatProvider};
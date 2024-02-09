const { createContext, useContext, useState } = require("react");

const authenticationContext = createContext();
const AuthProvder = (props) => {
    const [user,setUser] = useState({})
    return <authenticationContext.Provider value={{user,setUser}} {...props}></authenticationContext.Provider>;
};
const useAuthContext = () => {
    const context = useContext(authenticationContext);
    if(typeof context === "undefined") throw new Error("authentication context is undifined");
    return context
}
export { useAuthContext, AuthProvder};
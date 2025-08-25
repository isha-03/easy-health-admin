import { createContext } from "react";

export const AdminContext = createContext()

// Minimal admin context - just to prevent errors
const AdminContextProvider = (props) => {
    const value = {
        aToken: null,
        setAToken: () => {},
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
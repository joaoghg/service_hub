import { createContext, useState } from "react";

export const AuthContext = createContext({})

export function AuthProvider({ children }) {

    const [auth, setAuth] = useState('')

    const signIn = () => {
        setAuth(true)
    }

    const signOut = () => {
        setAuth(false)
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
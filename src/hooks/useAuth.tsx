import { useContext, createContext, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ProviderProp } from "../types";

interface AuthProviderProp {
    role: string
    setRole: (role: string) => void
    token: string
    setToken: (token: string) => void
    logOut: () => void
}

export const AuthContext = createContext<AuthProviderProp>({
    role: '',
    setRole: () => null,
    token: '',
    setToken: () => null,
    logOut: () => null,
})

export const AuthProvider = ({ children }: ProviderProp) => {
    const [token, setToken] = useState('')
    const [role, setRole] = useState('')

    const navigate = useNavigate()

    const logOut = useCallback(() => {
        setToken("")
        localStorage.removeItem("token")
        navigate("/")
    }, [navigate])
    
    const value = useMemo(() => {
        return{
            token,
            setToken,
            logOut,
            role, 
            setRole
        }
    }, [token, logOut, role])
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
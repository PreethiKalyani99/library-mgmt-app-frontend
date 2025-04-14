import { useContext, createContext, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ProviderProp } from "../types";
import Cookies from "js-cookie";

interface AuthProviderProp {
    role: string
    setRole: (role: string) => void
    token: string
    setToken: (token: string) => void
    logOut: () => void
    isExpired: (t: number) => boolean
}

export const AuthContext = createContext<AuthProviderProp>({
    role: '',
    setRole: () => null,
    token: '',
    setToken: () => null,
    logOut: () => null,
    isExpired: (s: number) => false
})

export const AuthProvider =   ({ children }: ProviderProp) => {
    const [token, setToken] =  useState('')
    const [role, setRole] = useState('')

    const navigate = useNavigate()

    const logOut = useCallback(() => {
        setToken("")
        Cookies.remove("token")
        navigate("/")
    }, [navigate])

    const isExpired = (tokenExp: number) => {
        const currentTime = new Date().getTime() / 1000

        if (tokenExp < currentTime) {
            console.log("Token expired, logging out...")
            logOut()
            return true
        }
        return false
    }
    
    const value = useMemo(() => {
        return{
            token,
            setToken,
            logOut,
            role, 
            setRole,
            isExpired
        }
    }, [token, logOut, role])
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
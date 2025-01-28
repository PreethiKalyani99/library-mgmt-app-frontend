import { useState, useMemo, createContext, useContext } from "react";
import { ProviderProp } from "../types";

interface TokenContextProps {
    token: string
    setToken: (token: string) => void
}

export const TokenContext = createContext<TokenContextProps>({
    token: '',
    setToken: () => null
})

export const TokenProvider = ({ children }: ProviderProp) => {
    const [token, setToken] = useState('')
    
    const value = useMemo(() => {
        return{
            token,
            setToken,
        }
    }, [token])
    
    
    return (
        <TokenContext.Provider value={value}>
            {children}
        </TokenContext.Provider>
    )
}

export const useAuthToken = () => useContext(TokenContext)
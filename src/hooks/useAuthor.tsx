import { useState, useMemo, createContext, useContext } from "react"; 
import { ProviderProp, FormData } from "../types";

interface AuthorContextProps {
    formData:  FormData
    setFormData: (formData: FormData) => void
}

export const AuthorContext = createContext<AuthorContextProps>({
    formData: {name: '', country: ''} ,
    setFormData: () => null
})

export const AuthorProvider = ({children}: ProviderProp) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        country: ''
    })

    const value = useMemo(() => {
        return{
           formData,
           setFormData
        }
    }, [
        formData
    ])

    return <AuthorContext.Provider value={value}>{children}</AuthorContext.Provider>
}

export const useAuthor = () => useContext(AuthorContext)
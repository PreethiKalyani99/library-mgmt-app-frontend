import { useState, useMemo, useEffect, createContext, useContext } from "react"; 
import { ProviderProp, FormData } from "../types";

interface AuthorContextProps {
    formData:  FormData
    setFormData: (formData: FormData) => void
    isAlertVisible: boolean
    setIsAlertVisible: (visible: boolean) => void
}

export const AuthorContext = createContext<AuthorContextProps>({
    formData: {name: '', country: ''} ,
    setFormData: () => null,
    isAlertVisible: false,
    setIsAlertVisible: () => null,
})

export const AuthorProvider = ({children}: ProviderProp) => {
    const [isAlertVisible, setIsAlertVisible] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        country: ''
    })

    useEffect(() => {
        if(isAlertVisible){
            const timer = setTimeout(() => setIsAlertVisible(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [isAlertVisible])

    const value = useMemo(() => {
        return{
           formData,
           setFormData,
           isAlertVisible,
           setIsAlertVisible,
        }
    }, [
        formData,
        isAlertVisible,
    ])

    return <AuthorContext.Provider value={value}>{children}</AuthorContext.Provider>
}

export const useAuthor = () => useContext(AuthorContext)
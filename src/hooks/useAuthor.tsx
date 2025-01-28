import { useState, useMemo, useEffect, createContext, useContext } from "react"; 
import { ProviderProp, AuthorForm } from "../types";

interface AuthorContextProps {
    formData:  AuthorForm
    setFormData: (formData: AuthorForm) => void
    authorData: AuthorForm[]
    setAuthorData: (value: React.SetStateAction<AuthorForm[]>) => void
    isAlertVisible: boolean
    setIsAlertVisible: (visible: boolean) => void
}

export const AuthorContext = createContext<AuthorContextProps>({
    formData: {name: '', country: ''} ,
    setFormData: () => null,
    isAlertVisible: false,
    setIsAlertVisible: () => null,
    authorData: [],
    setAuthorData: () => {},
})

export const AuthorProvider = ({children}: ProviderProp) => {
    const [isAlertVisible, setIsAlertVisible] = useState(false)
    const [authorData, setAuthorData] = useState<AuthorForm[]>([])
    const [formData, setFormData] = useState<AuthorForm>({
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
           authorData,
           setAuthorData,
        }
    }, [
        formData,
        authorData,
        isAlertVisible,
    ])

    return <AuthorContext.Provider value={value}>{children}</AuthorContext.Provider>
}

export const useAuthor = () => useContext(AuthorContext)
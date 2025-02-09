import { useState, useMemo, useEffect, createContext, useContext } from "react"; 
import { ProviderProp, AuthorForm } from "../types";

interface AuthorContextProps {
    formData:  AuthorForm
    setFormData: (formData: AuthorForm) => void
    authorData: AuthorForm[]
    setAuthorData: (value: React.SetStateAction<AuthorForm[]>) => void
    isAlertVisible: boolean
    setIsAlertVisible: (visible: boolean) => void
    options: string[]
    setOptions: (value: React.SetStateAction<string[]>) => void
    count: number
    setCount: (count: number) => void
    currentPage: number
    setCurrentPage: (page: number) => void
    rowsPerPage: number
    setRowsPerPage: (page: number) => void
}

export const AuthorContext = createContext<AuthorContextProps>({ 
    formData: {name: '', country: ''} ,
    setFormData: () => {},
    isAlertVisible: false,
    setIsAlertVisible: () => null,
    authorData: [],
    setAuthorData: () => {},
    options: [],
    setOptions: () => null,
    count: 0,
    setCount: () => null,
    currentPage: 1,
    setCurrentPage: () => null,
    rowsPerPage: 10,
    setRowsPerPage: () => null,
})

export const AuthorProvider = ({children}: ProviderProp) => {
    const [isAlertVisible, setIsAlertVisible] = useState(false)
    const [authorData, setAuthorData] = useState<AuthorForm[]>([])
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [options, setOptions] = useState<string[]>([])
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
           options,
           setOptions,
           count,
           setCount,
           currentPage,
           setCurrentPage,
           rowsPerPage,
           setRowsPerPage
        }
    }, [
        formData,
        authorData,
        isAlertVisible,
        options,
        count, 
        currentPage,
        rowsPerPage
    ])

    return <AuthorContext.Provider value={value}>{children}</AuthorContext.Provider>
}

export const useAuthor = () => useContext(AuthorContext)
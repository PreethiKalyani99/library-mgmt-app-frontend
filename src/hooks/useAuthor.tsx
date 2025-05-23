import { useState, useMemo, useEffect, createContext, useContext } from "react"; 
import { ProviderProp, AuthorForm } from "../types";

interface AuthorContextProps {
    formData:  AuthorForm
    setFormData: (formData: AuthorForm) => void
    errors:  AuthorForm
    setErrors: (formData: AuthorForm) => void
    authorData: AuthorForm[]
    setAuthorData: (value: React.SetStateAction<AuthorForm[]>) => void
    isAlertVisible: boolean
    setIsAlertVisible: (visible: boolean) => void
    isLoading: boolean
    setIsLoading: (visible: boolean) => void
    showModal: boolean
    setShowModal: (visible: boolean) => void
    isEdit: boolean
    setIsEdit: (visible: boolean) => void
    rowId: number
    setRowId: (value: number) => void
    options: string[]
    setOptions: (value: React.SetStateAction<string[]>) => void
    count: number
    setCount: (count: number) => void
    currentPage: number
    setCurrentPage: (page: number) => void
    rowsPerPage: number
    setRowsPerPage: (page: number) => void
    query: string
    setQuery: (str: string) => void
}

export const AuthorContext = createContext<AuthorContextProps>({ 
    formData: {name: '', country: ''} ,
    setFormData: () => {},
    isAlertVisible: false,
    setIsAlertVisible: () => null,
    isLoading: false,
    setIsLoading: () => null,
    authorData: [],
    setAuthorData: () => {},
    options: [],
    setOptions: () => null,
    count: 0,
    setCount: () => null,
    isEdit: false,
    setIsEdit: () => null,
    showModal: false,
    setShowModal: () => null,
    rowId: 0,
    setRowId: () => null,
    currentPage: 1,
    setCurrentPage: () => null,
    rowsPerPage: 10,
    setRowsPerPage: () => null,
    query: '',
    setQuery: () => null,
    errors: {name: '', country: ''} ,
    setErrors: () => {},
})

export const AuthorProvider = ({children}: ProviderProp) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isAlertVisible, setIsAlertVisible] = useState(false)
    const [authorData, setAuthorData] = useState<AuthorForm[]>([])
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [options, setOptions] = useState<string[]>([])
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [rowId, setRowId] = useState(0)
    const [query, setQuery] = useState('')
    const [formData, setFormData] = useState<AuthorForm>({
        name: '',
        country: ''
    })
    const [errors, setErrors] = useState<AuthorForm>({
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
           setRowsPerPage,
           query,
           setQuery,
           errors,
           setErrors,
           showModal,
           setShowModal,
           isEdit,
           setIsEdit,
           rowId,
           setRowId,
           isLoading,
           setIsLoading
        }
    }, [
        formData,
        authorData,
        isAlertVisible,
        options,
        count, 
        currentPage,
        rowsPerPage,
        query,
        errors,
        showModal,
        isEdit,
        rowId,
        isLoading
    ])

    return <AuthorContext.Provider value={value}>{children}</AuthorContext.Provider>
}

export const useAuthor = () => useContext(AuthorContext)
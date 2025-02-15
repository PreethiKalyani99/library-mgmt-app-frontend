import { useState, useMemo, useEffect, createContext, useContext } from "react"; 
import { ProviderProp, BorrowDataProp, BookData, UserForm } from "../types";

interface FormProp {
    title: string
    borrower: string
    borrowDate: string
    returnDate: string
}

interface BorrowContextProps {
    formData:  FormProp
    setFormData: (formData: FormProp) => void
    errors:  FormProp
    setErrors: (errors: FormProp) => void
    isAlertVisible: boolean
    setIsAlertVisible: (visible: boolean) => void
    borrowData: BorrowDataProp[]
    setBorrowData: (value: React.SetStateAction<BorrowDataProp[]>) => void
    count: number
    setCount: (count: number) => void
    currentPage: number
    setCurrentPage: (page: number) => void
    rowsPerPage: number
    setRowsPerPage: (page: number) => void
    query: string
    setQuery: (str: string) => void
    bookOptions: BookData[]
    setBookOptions: (value: React.SetStateAction<BookData[]>) => void
    userOptions: UserForm[]
    setUserOptions: (value: React.SetStateAction<UserForm[]>) => void
    showModal: boolean
    setShowModal: (visible: boolean) => void
    isEdit: boolean
    setIsEdit: (visible: boolean) => void 
    rowId: number
    setRowId: (value: number) => void
    isLoading: boolean
    setIsLoading: (val: boolean) => void
}

export const BorrowContext = createContext<BorrowContextProps>({
    formData: {
        title: '',
        borrower: '',
        borrowDate: '',
        returnDate: ''
    } ,
    setFormData: () => null,
    errors: {
        title: '',
        borrower: '',
        borrowDate: '',
        returnDate: ''
    },
    setErrors: () => null,
    isAlertVisible: false,
    setIsAlertVisible: () => null,
    borrowData: [],
    setBorrowData: () => {},
    count: 0,
    setCount: () => null,
    currentPage: 1,
    setCurrentPage: () => null,
    rowsPerPage: 10,
    setRowsPerPage: () => null,
    query: '',
    setQuery: () => null,
    bookOptions: [],
    setBookOptions: () => null,
    userOptions: [],
    setUserOptions: () => null,
    isEdit: false,
    setIsEdit: () => null,
    showModal: false,
    setShowModal: () => null,
    rowId: 0,
    setRowId: () => null,
    isLoading: false,
    setIsLoading: () => null
})

export const BorrowProvider = ({children}: ProviderProp) => {
    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [rowId, setRowId] = useState(0)
    const [borrowData, setBorrowData] = useState<BorrowDataProp[]>([])
    const [bookOptions, setBookOptions] = useState<BookData[]>([])
    const [userOptions, setUserOptions] = useState<UserForm[]>([])
    const [isAlertVisible, setIsAlertVisible] = useState(false)
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [query, setQuery] = useState('')
    const [formData, setFormData] = useState<FormProp>({
        title: '',
        borrower: '',
        borrowDate: '',
        returnDate: ''
    })
    const [errors, setErrors] = useState<FormProp>({
        title: '',
        borrower: '',
        borrowDate: '',
        returnDate: ''
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
           borrowData,
           setBorrowData,
           isAlertVisible,
           setIsAlertVisible,
           count,
           setCount,
           currentPage,
           setCurrentPage,
           rowsPerPage,
           setRowsPerPage,
           query,
           setQuery,
           bookOptions,
           setBookOptions,
           userOptions,
           setUserOptions,
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
        borrowData,
        isAlertVisible,
        count,
        currentPage,
        rowsPerPage, 
        query,
        bookOptions,
        userOptions,
        errors,
        showModal,
        isEdit,
        rowId,
        isLoading
    ])

    return <BorrowContext.Provider value={value}>{children}</BorrowContext.Provider>
}

export const useBorrow = () => useContext(BorrowContext)
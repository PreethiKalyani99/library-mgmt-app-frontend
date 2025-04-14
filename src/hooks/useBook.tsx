import { useState, useMemo, useEffect, createContext, useContext } from "react"; 
import { ProviderProp, BookForm } from "../types";

interface FormProp {
    authorName: string
    title: string
    publishedYear?: string
}

interface BookContextProps {
    formData:  FormProp
    setFormData: (formData: FormProp) => void
    errors:  FormProp
    setErrors: (formData: FormProp) => void
    isAlertVisible: boolean
    setIsAlertVisible: (visible: boolean) => void
    bookData: BookForm[]
    setBookData: (value: React.SetStateAction<BookForm[]>) => void
    count: number
    setCount: (count: number) => void
    currentPage: number
    setCurrentPage: (page: number) => void
    rowsPerPage: number
    setRowsPerPage: (page: number) => void
    query: string
    setQuery: (str: string) => void
    showModal: boolean
    setShowModal: (visible: boolean) => void
    isEdit: boolean
    setIsEdit: (visible: boolean) => void
    rowId: number
    setRowId: (value: number) => void
    isLoading: boolean
    setIsLoading: (val: boolean) => void
}

export const BookContext = createContext<BookContextProps>({
    formData: {authorName: '', title: '', publishedYear: ''} ,
    setFormData: () => null,
    errors: {authorName: '', title: '', publishedYear: ''} ,
    setErrors: () => null,
    isAlertVisible: false,
    setIsAlertVisible: () => null,
    bookData: [],
    setBookData: () => {},
    count: 0,
    setCount: () => null,
    currentPage: 1,
    setCurrentPage: () => null,
    rowsPerPage: 10,
    setRowsPerPage: () => null,
    query: '',
    setQuery: () => null,
    isEdit: false,
    setIsEdit: () => null,
    showModal: false,
    setShowModal: () => null,
    rowId: 0,
    setRowId: () => null,
    isLoading: false,
    setIsLoading: () => null
})

export const BookProvider = ({children}: ProviderProp) => {
    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [rowId, setRowId] = useState(0)
    const [bookData, setBookData] = useState<BookForm[]>([])
    const [isAlertVisible, setIsAlertVisible] = useState(false)
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [query, setQuery] = useState('')
    const [formData, setFormData] = useState<FormProp>({ 
       authorName: '', 
       title: '', 
       publishedYear: ''
    })
    const [errors, setErrors] = useState<FormProp>({
        authorName: '', 
        title: '', 
        publishedYear: ''
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
           bookData,
           setBookData,
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
        bookData,
        isAlertVisible,
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

    return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}

export const useBook = () => useContext(BookContext)
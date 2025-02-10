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
}

export const BookContext = createContext<BookContextProps>({
    formData: {authorName: '', title: '', publishedYear: ''} ,
    setFormData: () => null,
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
})

export const BookProvider = ({children}: ProviderProp) => {
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
        }
    }, [
        formData,
        bookData,
        isAlertVisible,
        count,
        currentPage,
        rowsPerPage, 
        query
    ])

    return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}

export const useBook = () => useContext(BookContext)
import { useState, useMemo, useEffect, createContext, useContext } from "react"; 
import { ProviderProp, BookForm } from "../types";

interface BookContextProps {
    formData:  BookForm
    setFormData: (formData: BookForm) => void
    isAlertVisible: boolean
    setIsAlertVisible: (visible: boolean) => void
    bookData: BookForm[]
    setBookData: (value: React.SetStateAction<BookForm[]>) => void
}

export const BookContext = createContext<BookContextProps>({
    formData: {authorName: '', title: '', publishedYear: ''} ,
    setFormData: () => null,
    isAlertVisible: false,
    setIsAlertVisible: () => null,
    bookData: [],
    setBookData: () => {},
})

export const BookProvider = ({children}: ProviderProp) => {
    const [bookData, setBookData] = useState<BookForm[]>([])
    const [isAlertVisible, setIsAlertVisible] = useState(false)
    const [formData, setFormData] = useState<BookForm>({
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
        }
    }, [
        formData,
        bookData,
        isAlertVisible,
    ])

    return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}

export const useBook = () => useContext(BookContext)
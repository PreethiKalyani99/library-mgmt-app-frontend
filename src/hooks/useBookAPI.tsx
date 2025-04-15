import { useBook } from "./useBook";
import { GetApiProp } from "../types";
import { useAuth } from "./useAuth";

interface AuthorProp {
    id?: string
    name: string
    country?: string
}
interface AddBookProp {
    title: string,
    published_year: string
    author : AuthorProp
}

export const useBookAPI = () => {
    const { setBookData, setCount, bookData } = useBook()
    const { token } = useAuth()

    const addBook = async (newBook: AddBookProp) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/books`, {
                method: "POST",
                headers: {
                    "authorization": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBook)
            })

            if (!response.ok) {
                throw new Error(`Failed to add book, status: ${response.status}`)
            }

            const result: any = await response.json()
            setBookData([{ book_id: result.book_id, author: result.author, published_year: result.published_year, title: result.title }, ...bookData])

        } catch (error) {
            console.log(`Error adding book: ${error}`)
            throw error
        }
    }

    const getBook = async ({ search, pageNumber = 1, pageSize = 10}: GetApiProp) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/books?page_number=${pageNumber}&page_size=${pageSize}${search ? `&search=${search}`: ''}`, {
                method: "GET",
                headers: {
                    "authorization": token || '',
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to get books, status: ${response.status}`)
            }

            const result = await response.json()
            setBookData(result.data)
            setCount(Number(result.totalCount))
            return result

        } catch (error) {
            console.log(`Error getting books: ${error}`)
            throw error
        }
    }

    interface AuthorProp {
        id?: number
        name?: string
    }
    interface BookProp {
        id: number
        title?: string
        published_year?: string
        author?: AuthorProp
    }

    const updateBook = async (bookProp: BookProp) => {
        const { id, ...props } = bookProp
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/books/${id}`, {
                method: "PUT",
                headers: {
                    "authorization": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(props)
            })

            if (!response.ok) {
                throw new Error(`Failed to update book, status: ${response.status}`)
            }
            const result = await response.json()
            const updatedData = bookData.map((book) => 
                book.book_id === id ? 
                    { ...book, author: result.author, published_year: result.published_year, title: result.title } 
                    :
                    book
            )
            setBookData(updatedData)

        } catch (error) {
            console.log(`Error updating book: ${error}`)
            throw error
        }
    }

    const deleteBook = async (id: number) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/books/${id}`, {
                method: "DELETE",
                headers: {
                    "authorization": token,
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to delete book, status: ${response.status}`)
            }
            const updatedData = bookData.filter((book) => book.book_id !== id)
            setBookData(updatedData)

        } catch (error) {
            console.log(`Error deleting book: ${error}`)
            throw error
        }
    }

    return {
        addBook,
        getBook,
        deleteBook,
        updateBook,
    }
}
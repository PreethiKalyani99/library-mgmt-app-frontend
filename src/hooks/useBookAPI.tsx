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
    const { setBookData, setCount } = useBook()
    const { token } = useAuth()

    const addBook = async (newBook: AddBookProp) => {
        try {
            const response = await fetch("https://library-mgmt-us4m.onrender.com/books", {
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

            const result = await response.json()

        } catch (error) {
            console.log(`Error adding book: ${error}`)
            throw error
        }
    }

    const getBook = async ({ search, pageNumber = 1, pageSize = 10}: GetApiProp) => {
        try {
            const response = await fetch(`https://library-mgmt-us4m.onrender.com/books?page_number=${pageNumber}&page_size=${pageSize}${search ? `&search=${search}`: ''}`, {
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
            const response = await fetch(`https://library-mgmt-us4m.onrender.com/books/${id}`, {
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
            await response.json()

        } catch (error) {
            console.log(`Error updating book: ${error}`)
            throw error
        }
    }

    const deleteBook = async (id: number) => {
        try {
            const response = await fetch(`https://library-mgmt-us4m.onrender.com/books/${id}`, {
                method: "DELETE",
                headers: {
                    "authorization": token,
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to delete book, status: ${response.status}`)
            }

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
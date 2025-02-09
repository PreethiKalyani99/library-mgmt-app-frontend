import { useBook } from "./useBook";
import { useAuth } from "./useAuth";

interface AuthorProp {
    id: string
    name?: string
    country?: string
}
interface AddBookProp {
    title: string,
    published_year: string
    author : AuthorProp
}

export const useBookAPI = () => {
    const { setBookData } = useBook()
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
            setBookData((prevData) => [...prevData, result.data])

        } catch (error) {
            console.log(`Error adding book: ${error}`)
            throw error
        }
    }

    return {
        addBook
    }
}
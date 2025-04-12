import { AuthorForm } from "../types";
import { useAuthor } from "./useAuthor";
import { GetApiProp } from "../types";
import { useAuth } from "./useAuth";

export const useAuthorAPI = () => {
    const { setAuthorData, setCount } = useAuthor()
    const { token } = useAuth()
    
    const addAuthor = async (newAuthor: AuthorForm) => {
        try {
            const response = await fetch(`${process.env.BASE_URL}/authors`, {
                method: "POST",
                headers: {
                    "authorization": token || '', 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newAuthor)
            })

            if (!response.ok) {
                throw new Error(`Failed to add author, status: ${response.status}`)
            }

            await response.json()
        } catch (error) {
            console.log(`Error adding author: ${error}`)
            throw error
        }
    }

    const getAuthor = async ({ search, pageNumber = 1, pageSize = 10}: GetApiProp) => {
        try {
            const response = await fetch(`${process.env.BASE_URL}/authors?page_number=${pageNumber}&page_size=${pageSize}${search ? `&search=${search}`: ''}`, {
                method: "GET",
                headers: {
                    "authorization": token || '',
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to get author, status: ${response.status}`)
            }

            const result = await response.json()
            setAuthorData(result.data)
            setCount(Number(result.totalCount))
            return result

        } catch (error) {
            console.log(`Error getting author: ${error}`)
            throw error
        }
    }

    interface UpdateAuthor {
        id: number
        author: {
            name?: string
            country?: string
        }
    }

    const updateAuthor = async (authorProp: UpdateAuthor) => {
        const { id, author } = authorProp
        try {
            const response = await fetch(`${process.env.BASE_URL}/authors/${id}`, {
                method: "PUT",
                headers: {
                    "authorization": token || '',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(author)
            })

            if (!response.ok) {
                throw new Error(`Failed to delete author, status: ${response.status}`)
            }

            await response.json()
        } catch (error) {
            console.log(`Error deleting author: ${error}`)
            throw error
        }
    }

    const deleteAuthor = async (id: number) => {
        try {
            const response = await fetch(`${process.env.BASE_URL}/authors/${id}`, {
                method: "DELETE",
                headers: {
                    "authorization": token || '',
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to delete author, status: ${response.status}`)
            }
        } catch (error) {
            console.log(`Error deleting author: ${error}`)
            throw error
        }
    }
    return {
        addAuthor,
        getAuthor,
        updateAuthor,
        deleteAuthor,
    }
}
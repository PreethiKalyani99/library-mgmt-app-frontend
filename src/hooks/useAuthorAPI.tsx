import { AuthorForm } from "../types";
import { useAuthor } from "./useAuthor";

export const useAuthorAPI = () => {
    const { setAuthorData, setCount } = useAuthor()
    const token = localStorage.getItem("token")
    
    const addAuthor = async (newAuthor: AuthorForm) => {
        try {
            const response = await fetch("https://library-mgmt-us4m.onrender.com/authors", {
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

            const result = await response.json()
            setAuthorData(prev => ({
                ...prev,
                ...result.data
            }))

        } catch (error) {
            console.log(`Error adding author: ${error}`)
            throw error
        }
    }

    interface GetAuthorProp {
        search?: string
        pageNumber?: number
        pageSize?: number
    }

    const getAuthor = async ({ search, pageNumber = 1, pageSize = 10}: GetAuthorProp) => {
        try {
            const response = await fetch(`https://library-mgmt-us4m.onrender.com/authors?page_number=${pageNumber}&page_size=${pageSize}${search ? `&search=${search}`: ''}`, {
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

    return {
        addAuthor,
        getAuthor,
    }
}
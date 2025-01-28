import { AuthorForm } from "../types";
import { useAuthToken } from "./useAuthToken";
import { useAuthor } from "./useAuthor";

export const useAuthorAPI = () => {
    const { setAuthorData } = useAuthor()
    const { token } = useAuthToken()

    const addAuthor = async (newAuthor: AuthorForm) => {
        try {
            const response = await fetch("https://library-mgmt-us4m.onrender.com/authors", {
                method: "POST",
                headers: {
                    "authorization": token
                },
                body: JSON.stringify(newAuthor)
            })

            if (!response.ok) {
                throw new Error(`Failed to add author, status: ${response.status}`)
            }

            const result = await response.json()
            setAuthorData((prevData) => [...prevData, result.data])

        } catch (error) {
            console.log(`Error adding author: ${error}`)
            throw error
        }
    }

    return {
        addAuthor
    }
}
import { useState, useMemo, createContext, useContext } from "react"; 
import { ProviderProp, FormData } from "../types";

interface AuthorDataContextProps {
    authorData: FormData[]
    setAuthorData: (authorData: FormData[]) => void
    addAuthor: (newAuthor: FormData) => void
}

export const AuthorDataContext = createContext<AuthorDataContextProps>({
    authorData: [],
    setAuthorData: () => null,
    addAuthor: () => null
})

export const AuthorDataProvider = ({children}: ProviderProp) => {
    const [authorData, setAuthorData] = useState<FormData[]>([])

    const addAuthor = async (newAuthor: FormData) => {
        try {
            const response = await fetch("https://library-mgmt-us4m.onrender.com/authors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
        }
    }

    const value = useMemo(() => {
        return{
           authorData,
           setAuthorData,
           addAuthor
        }
    }, [
        authorData
    ])

    return <AuthorDataContext.Provider value={value}>{children}</AuthorDataContext.Provider>
}

export const useAuthorAPI = () => useContext(AuthorDataContext)
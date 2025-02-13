import { useUser } from "./useUser"
import { UserFormProp, GetApiProp } from "../types"

export const useUserAPI = () => {
    const { setUserData, setCount } = useUser()

    const token = localStorage.getItem("token")

    const addUser = async (newUser: UserFormProp) => {
        try {
            const response = await fetch("https://library-mgmt-us4m.onrender.com/users", {
                method: "POST",
                headers: {
                    "authorization": token || '',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })

            if (!response.ok) {
                throw new Error(`Failed to create user, status: ${response.status}`)
            }

            const result = await response.json()
        } catch (error) {
            console.log(`Error creating user: ${error}`)
            throw error
        }
    }

    const getUser = async ({ search, pageNumber = 1, pageSize = 10 }: GetApiProp) => {
        try {
            const response = await fetch(`https://library-mgmt-us4m.onrender.com/users?page_number=${pageNumber}&page_size=${pageSize}${search ? `&search=${search}` : ''}`, {
                method: "GET",
                headers: {
                    "authorization": token || '',
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to get users, status: ${response.status}`)
            }

            const result = await response.json()
            setUserData(result.data)
            setCount(Number(result.totalCount))
            return result

        } catch (error) {
            console.log(`Error getting users: ${error}`)
            throw error
        }
    }

    interface RoleProp {
        role: string
        id: number 
    }

    const updateUser = async ({ role, id } : RoleProp) => {
        try {
            const response = await fetch(`https://library-mgmt-us4m.onrender.com/users/${id}`, {
                method: "PUT",
                headers: {
                    "authorization": token || '',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ role })
            })

            if (!response.ok) {
                throw new Error(`Failed to update user, status: ${response.status}`)
            }

            const result = await response.json()
        } catch (error) {
            console.log(`Error updating user: ${error}`)
            throw error
        }
    }

    return {
        addUser,
        getUser,
        updateUser,
    }
}
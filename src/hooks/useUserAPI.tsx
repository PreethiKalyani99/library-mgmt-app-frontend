import { useUser } from "./useUser"
import { UserFormProp, GetApiProp, UserForm } from "../types"
import { useAuth } from "./useAuth"

export const useUserAPI = () => {
    const { setUserData, setCount, setRoleData, roleData, userData } = useUser()
    const { token } = useAuth()

    const addUser = async (newUser: UserFormProp) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
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
            setUserData([{user_id: result.user_id, email: result.email, role: result.role}, ...userData])
        } catch (error) {
            console.log(`Error creating user: ${error}`)
            throw error
        }
    }

    const getUser = async ({ search, pageNumber = 1, pageSize = 10 }: GetApiProp) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users?page_number=${pageNumber}&page_size=${pageSize}${search ? `&search=${search}` : ''}`, {
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
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
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
            const updatedData: UserForm[] = userData.map((user) =>
                user.user_id === id
                  ? { ...user, role: result.role }
                  : user
            )
           setUserData(updatedData)
        } 
        catch (error) {
            console.log(`Error updating user: ${error}`)
            throw error
        }
    }

    const createRole = async (role: string) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/roles`, {
                method: "POST",
                headers: {
                    "authorization": token || '',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ role })
            })

            if (!response.ok) {
                throw new Error(`Failed to Create role, status: ${response.status}`)
            }

            const result = await response.json()
            setRoleData([...roleData, result.role])
        } catch (error) {
            console.log(`Error creating role: ${error}`)
            throw error
        }
    }

    const getRoles = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/roles`, {
                method: "GET",
                headers: {
                    "authorization": token || '',
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to get roles, status: ${response.status}`)
            }

            const result = await response.json()
            return result
        } catch (error) {
            console.log(`Error getting roles: ${error}`)
            throw error
        }
    }

    return {
        addUser,
        getUser,
        updateUser,
        createRole,
        getRoles,
    }
}
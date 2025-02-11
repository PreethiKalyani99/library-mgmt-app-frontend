import { useBorrow } from "./useBorrow"
import { BorrowFormData, GetApiProp } from "../types"

export const useBorrowAPI = () => {
    const { setBorrowData, setCount } = useBorrow()

    const token = localStorage.getItem("token")

    const addBorrower = async (newBorrower: BorrowFormData) => {
        try {
            const response = await fetch("https://library-mgmt-us4m.onrender.com/borrow", {
                method: "POST",
                headers: {
                    "authorization": token || '',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBorrower)
            })

            if (!response.ok) {
                throw new Error(`Failed to add borrower, status: ${response.status}`)
            }

            const result = await response.json()
        } catch (error) {
            console.log(`Error adding borrower: ${error}`)
            throw error
        }
    }

    const getBorrower = async ({ search, pageNumber = 1, pageSize = 10 }: GetApiProp) => {
        try {
            const response = await fetch(`https://library-mgmt-us4m.onrender.com/borrow?page_number=${pageNumber}&page_size=${pageSize}${search ? `&search=${search}` : ''}`, {
                method: "GET",
                headers: {
                    "authorization": token || '',
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to get borrower, status: ${response.status}`)
            }

            const result = await response.json()
            setBorrowData(result.data)
            setCount(Number(result.totalCount))
            return result

        } catch (error) {
            console.log(`Error getting borrower: ${error}`)
            throw error
        }
    }

    interface BorrowerByIdProp extends GetApiProp {
        id: number | undefined
    }

    const getBorrowerById = async ({ id, search, pageNumber = 1, pageSize = 10 }: BorrowerByIdProp) => {
        try {
            const response = await fetch(`https://library-mgmt-us4m.onrender.com/borrow/${id}?page_number=${pageNumber}&page_size=${pageSize}${search ? `&search=${search}` : ''}`, {
                method: "GET",
                headers: {
                    "authorization": token || '',
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to get borrower, status: ${response.status}`)
            }

            const result = await response.json()
            setBorrowData(result.data)
            setCount(Number(result.totalCount))
            return result

        } catch (error) {
            console.log(`Error getting borrower: ${error}`)
            throw error
        }
    }

    return {
        addBorrower,
        getBorrower,
        getBorrowerById,
    }
}
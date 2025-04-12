import { useBorrow } from "./useBorrow"
import { BorrowFormData, GetApiProp } from "../types"
import { useAuth } from "./useAuth"

export const useBorrowAPI = () => {
    const { setBorrowData, setCount } = useBorrow()
    const { token } = useAuth()
    
    const addBorrower = async (newBorrower: BorrowFormData) => {
        const { return_date, borrow_date } = newBorrower

        try {
            if(return_date && (new Date(borrow_date) >= new Date(return_date))){
                throw new Error("Borrow date should be earlier than return date")
            }

            const response = await fetch(`${process.env.BASE_URL}/borrow`, {
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
            const response = await fetch(`${process.env.BASE_URL}/borrow?page_number=${pageNumber}&page_size=${pageSize}${search ? `&search=${search}` : ''}`, {
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
            const response = await fetch(`${process.env.BASE_URL}/borrow/${id}?page_number=${pageNumber}&page_size=${pageSize}${search ? `&search=${search}` : ''}`, {
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

    interface BorrowerProp {
        id: number
        return_date: string
        borrow_date: string
    }

    const updateBorrower = async (updateProp: BorrowerProp) => {
        const { id, return_date, borrow_date } = updateProp
        try {
            if(new Date(borrow_date) >= new Date(return_date)){
                throw new Error("Borrow date should be earlier than return date")
            }
            const response = await fetch(`${process.env.BASE_URL}/borrow/${id}`, {
                method: "PUT",
                headers: {
                    "authorization": token || '',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ return_date })
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

    return {
        addBorrower,
        getBorrower,
        getBorrowerById,
        updateBorrower,
    }
}
import { useState, useCallback } from "react"
import { debounce } from "lodash"
import { useBorrow } from "../../hooks/useBorrow"
import { useUserAPI } from "../../hooks/useUserAPI"
import { useBookAPI } from "../../hooks/useBookAPI"
import { useBorrowAPI } from "../../hooks/useBorrowAPI"
import { borrowFields } from "../../constants/formFields"
import { CustomForm } from "../common/form/Form"
import { ModalLayout } from "../common/modal/Modal"
import { Alert } from "../common/alert/Alert"
import { Loader } from "../common/loader/Loader"

interface CreateProp {
    setShowModal: (modal: boolean) => void
}

const CreateBorrowedBook: React.FC<CreateProp> = ({ setShowModal }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [alertProps, setAlertProps] = useState({
        type: 'success',
        message: 'Borrower created successfully'
    })

    const {
        formData,
        setFormData,
        isAlertVisible,
        setIsAlertVisible,
        bookOptions,
        setBookOptions,
        userOptions,
        setUserOptions
    } = useBorrow()
    const { getBook } = useBookAPI()
    const { getUser } = useUserAPI()
    const { addBorrower } = useBorrowAPI()

    const handleBookChange = (selected: any) => {
        setFormData({ ...formData, title: selected[0] || '' })
    }

    const handleBookSearch = (option: string) => {
        setFormData({...formData, title: option}) 
        if(option.length >= 3 && /^[a-zA-Z]+$/.test(option)){
            debouncedBook(option)
            return
        }
    }

    const debouncedBook = useCallback(
        debounce(async (newValue: string) => {
            const result = await getBook({ search: newValue })
            const books = result.data.map((book: any) => book.title)
            setBookOptions([...books])
        }, 1000),
    [])

    const handleUserChange = (selected: any) => {
        setFormData({ ...formData, borrower: selected[0] || '' })
    }

    const handleUserSearch = (option: string) => {
        setFormData({...formData, borrower: option}) 
        if(option.length >= 3 && /^[a-zA-Z0-9@.]+$/.test(option)){
            debouncedUser(option)
            return
        }
    }

    const debouncedUser = useCallback(
        debounce(async (newValue: string) => {
            const result = await getUser({ search: newValue })
            const users = result.data.map((user: any) => user.email)
            setUserOptions([...users])
        }, 1000),
        [])

    const formFields = borrowFields({
        formData,
        bookOptions,
        userOptions,
        bookInputChange: handleBookSearch,
        userInputChange: handleUserSearch,
        onBookChange: handleBookChange,
        onUserChange: handleUserChange
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newUser = {
            borrow_date: formData.borrowDate,
            return_date: formData.returnDate || null,
            book: {
                title: formData.title
            },
            borrower: {
                email: formData.borrower
            }
        }
        try {
            setIsLoading(true)
            await addBorrower(newUser)
            setShowModal(false)
            setFormData({ borrowDate: '', returnDate: '', title: '', borrower: '' })
            setAlertProps({ type: 'success', message: 'Borrower created successfully' })
        }
        catch (error) {
            setAlertProps({ type: 'error', message: 'Failed to create borrower' })
        }
        finally {
            setIsLoading(false)
            setIsAlertVisible(true)
        }
    }

    return (
        <>
            {isLoading && <Loader />}
            {isAlertVisible &&
                <Alert
                    type={alertProps.type}
                    message={alertProps.message}
                    onClose={() => setIsAlertVisible(false)}
                />
            }
            <ModalLayout
                height={70}
                title="Borrower Info"
                body={
                    <CustomForm
                        fields={formFields}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                        buttonText='Create Borrower'
                    />
                }
            />
        </>
    )
}

export default CreateBorrowedBook
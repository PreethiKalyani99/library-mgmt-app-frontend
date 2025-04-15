import { useCallback } from 'react';
import { debounce } from "lodash"
import { useBorrow } from './useBorrow';
import { useBorrowAPI } from './useBorrowAPI';
import { useBookAPI } from './useBookAPI';
import { useUserAPI } from './useUserAPI';
import { borrowFormValidation } from '../utils/validation';
import Actions from '../components/actions/Actions';

export const useBorrowHandlers = () => {
    const {
        setShowModal,
        showModal,
        setIsEdit,
        setRowId,
        borrowData,
        setFormData,
        setQuery,
        query,
        rowId,
        isEdit,
        formData,
        setIsLoading,
        errors,
        setErrors,
        setBookOptions,
        setUserOptions,
    } = useBorrow()

    const { addBorrower, getBorrower, updateBorrower } = useBorrowAPI()
    const { getBook } = useBookAPI()
    const { getUser } = useUserAPI()

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const handleEdit = (id: number) => {
        toggleModal()
        setIsEdit(true)
        setRowId(id)

        const borrower = borrowData.find(user => user.id === id)
        if (!borrower) {
            console.error("Borrower not found");
            return
        }

        setFormData({
            title: borrower.books.title,
            borrower: borrower.users.email,
            borrowDate: borrower.borrow_date,
            returnDate: borrower.return_date || '',
        })
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>, userId: number | undefined) => {
        const value = e.target.value
        setQuery(value)

        if (userId && value === '') {
            await getBorrower({})
        }
    }

    const handleSearch = async (userId: number | undefined) => {
        if (userId && query.length >= 3 && /^[a-zA-Z0-9@.]+$/.test(query)) {
            await getBorrower({ search: query })
        }
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, userId: number | undefined) => {
        if (e.key === 'Enter') {
            handleSearch(userId)
        }
    }

    const rowData = borrowData?.map(borrower => {
        return {
            id: borrower.id ?? 0,
            cells: [
                {
                    cellData: borrower.books.title
                },
                {
                    cellData: borrower.users.email
                },
                {
                    cellData: borrower.borrow_date
                },
                {
                    cellData: borrower.return_date ?? 'Not returned'
                },
                {
                    cellData: (<Actions onEdit={() => handleEdit(borrower.id || 0)} />)
                }
            ]
        }
    })

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

    const formValidationErrors = borrowFormValidation(formData)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleFormEdit = async () => {
        const updateProp = {
            id: rowId,
            return_date: formData.returnDate,
            borrow_date: formData.borrowDate
        }
        await updateBorrower(updateProp)
        setIsEdit(false)
    }

    const handleAdd = async () => {
        const newUser = {
            borrow_date: formData.borrowDate,
            book: {
                title: formData.title
            },
            borrower: {
                email: formData.borrower
            }
        }
        await addBorrower(newUser) 
    }

    const resetForm = () => {
        if(formData.title || formData.borrowDate || formData.returnDate || formData.borrower){
            setFormData({ borrowDate: '', returnDate: '', title: '', borrower: '' })
        }
        setErrors({ 
            title: '', 
            borrower: '',
            borrowDate: '',
            returnDate: ''
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (Object.keys(formValidationErrors).length > 0) {
            setErrors({ 
                title: formValidationErrors.title || '', 
                borrower: formValidationErrors.borrower || '',
                borrowDate: formValidationErrors.borrowDate || '',
                returnDate: formValidationErrors.returnDate || ''
            })
            return
        }
        if(isEdit && !formData.returnDate){
            setErrors({...errors, returnDate: "Return date should not be empty"})
            return
        }

        try {
            setIsLoading(true)
            await (isEdit ? handleFormEdit() : handleAdd())
            setShowModal(false)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
            resetForm()
        }
    }

    const handleClose = () => {
        setIsEdit(false)
        resetForm()
        setShowModal(false)
    }

    return {
        toggleModal,
        handleEdit,
        handleChange,
        handleSearch,
        onKeyDown,
        rowData,
        handleBookChange,
        handleBookSearch,
        handleUserChange,
        handleUserSearch,
        handleInputChange,
        handleSubmit,
        handleClose,
    }
}
import { useCallback } from 'react';
import { debounce } from "lodash"
import { useBook } from "./useBook";
import { useBookAPI } from "./useBookAPI";
import { useAuthorAPI } from './useAuthorAPI';
import { useAuthor } from './useAuthor';
import { bookFormValidation } from "../utils/validation";
import Actions from "../components/actions/Actions";

export const useBookHandlers = () => {
    const {
        setShowModal,
        showModal,
        setIsEdit,
        setRowId,
        bookData,
        setFormData,
        setQuery,
        query,
        rowId,
        isEdit,
        formData,
        setIsLoading,
        setErrors
    } = useBook()

    const { getBook, deleteBook, updateBook, addBook } = useBookAPI()
    const { getAuthor } = useAuthorAPI()
    const { setOptions } = useAuthor()

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const handleEdit = (id: number) => {
        toggleModal()
        setIsEdit(true)
        setRowId(id)

        const book = bookData.find(item => item.book_id === id)
        if (!book) {
            console.log("book not found")
            return
        }
        setFormData({ authorName: book.author.name, title: book.title, publishedYear: book.published_year?.toString() })
    }

    const handleDelete = (id: number) => {
        deleteBook(id)
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        if (value === '') {
            await getBook({})
        }
    }

    const handleSearch = async () => {
        if (query.length >= 3 && /^[a-zA-Z0-9]+$/.test(query)) {
            await getBook({ search: query })
        }
    }

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const rowData = bookData?.map(book => {
        return {
            id: book.book_id,
            cells: [
                {
                    cellData: book.title
                },
                {
                    cellData: book.author.name
                },
                {
                    cellData: book.published_year ?? '-'
                },
                {
                    cellData: (<Actions onEdit={() => handleEdit(book.book_id)} onDelete={() => handleDelete(book.book_id)} />)
                }
            ]
        }
    })

    const handleFormSearch = (option: string) => {
        setFormData({ ...formData, authorName: option })
        if (option.length >= 3 && /^[a-zA-Z]+$/.test(option)) {
            debouncedSave(option)
            return
        }
    }

    const handleOptionChange = (selected: any) => {
        setFormData({ ...formData, authorName: selected[0] || '' })
    }

    const debouncedSave = useCallback(
        debounce(async (newValue: string) => {
            const result = await getAuthor({ search: newValue })
            const authorNames = result.data.map((author: any) => author.name)
            setOptions([...authorNames])
        }, 1000),
    [])

    const formValidationErrors = bookFormValidation(formData)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleFormEdit = async () => {
        const updateProp = {
            id: rowId,
            title: formData.title,
            published_year: formData.publishedYear || '',
            author: {
                name: formData.authorName
            }
        }
        await updateBook(updateProp)
        setIsEdit(false)
    }

    const handleAdd = async () => {
        const newBook = {
            title: formData.title,
            published_year: formData.publishedYear || '',
            author: {
                name: formData.authorName
            }
        }
        await addBook(newBook)
    }

    const resetForm = () => {
        if (formData.authorName || formData.title || formData.publishedYear) {
            setFormData({ authorName: '', title: '', publishedYear: '' })
        }
        setErrors({
            authorName: '',
            title: '',
            publishedYear: ''
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (Object.keys(formValidationErrors).length > 0) {
            setErrors({
                authorName: formValidationErrors.authorName || '',
                title: formValidationErrors.title || '',
                publishedYear: formValidationErrors.publishedYear || ''
            })
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
        resetForm()
        setIsEdit(false)
        setShowModal(false)
    }


    return {
        toggleModal,
        handleEdit,
        handleDelete,
        handleChange,
        handleSearch,
        onKeyDown,
        rowData,
        handleFormSearch,
        formValidationErrors,
        handleOptionChange,
        handleInputChange,
        handleSubmit,
        handleClose
    }
}
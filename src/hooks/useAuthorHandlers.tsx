import { useAuthor } from "./useAuthor"
import { useAuthorAPI } from "./useAuthorAPI"
import { authorFormValidation } from "../utils/validation"
import { AuthorForm } from "../types"
import Actions from "../components/actions/Actions"

export const useAuthorHandlers = () => {
    const { 
        setShowModal, 
        showModal,
        setIsEdit,
        setRowId,
        authorData,
        setFormData,
        setQuery,
        query,
        rowId,
        isEdit,
        formData,
        setIsLoading,
        setErrors

    } = useAuthor()
    const { deleteAuthor, getAuthor, updateAuthor, addAuthor } = useAuthorAPI()

    const toggleModal = () => {
        setShowModal(!showModal) 
    }

    const handleEdit = (id: number) => {
        toggleModal()
        setIsEdit(true)
        setRowId(id)

        const author = authorData.find(a => a.author_id === id)
        if(!author){
            console.log("author not found")
            return
        }
        setFormData({ name: author.name, country: author.country })
    }

    const handleDelete = (id: number) => {
        deleteAuthor(id)
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        if(value === ''){
            await getAuthor({})
        }
    }

    const handleSearch = async () => {
        if(query.length >= 3 && /^[a-zA-Z]+$/.test(query)){
            await getAuthor({ search: query})
        }
    }

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(e.key === 'Enter'){
            handleSearch()
        }
    }

    const rowData = authorData?.map(author => {
        return {
            id: author.author_id ?? 0,
            cells: [
                {
                    cellData: author.name
                },
                {
                    cellData: author.country ?? '-'
                },
                {
                    cellData: (<Actions onEdit={() => handleEdit(author.author_id || 0)} onDelete={() => handleDelete(author.author_id || 0)}/>)
                }
            ]
        }
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevState: AuthorForm) => ({
            ...prevState, 
            [name]: value
        }))
    }

    const handleFormEdit = async () => {
        const authorProp = {
            id: rowId,
            author: {
                name: formData.name,
                country: formData.country
            }
        }
        await updateAuthor(authorProp)
        setIsEdit(false)
    }

    const resetForm = () => {
        setIsLoading(false) 
        setErrors({ name: '', country: '' })
        setFormData({ name: '', country: '' })
    }

    const formValidationErrors = authorFormValidation(formData)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (Object.keys(formValidationErrors).length > 0) {
            setErrors({ name: formValidationErrors.name || '', country: formValidationErrors.country || ''})
            return
        }
        try {
            setIsLoading(true)
            await (isEdit ? handleFormEdit() : addAuthor(formData))
            setShowModal(false)
        } 
        catch (error) {
            console.log(error)
        } 
        finally {
            resetForm()
        }
    }

    const handleClose = () => {
        if(formData.name || formData.country){
            setIsEdit(false)
            setFormData({ name: '', country: '' })
        }
        setErrors({ name: '', country: '' })
        setShowModal(false)
    }


    return {
        toggleModal,
        handleEdit,
        handleChange,
        handleSearch,
        onKeyDown,
        rowData,
        handleInputChange,
        handleFormEdit,
        handleSubmit,
        handleClose,
        
    }
}
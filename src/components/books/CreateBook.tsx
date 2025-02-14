import { useState, useCallback } from 'react';
import { debounce } from "lodash"
import { CustomForm } from '../common/form/Form';
import { ModalLayout } from '../common/modal/Modal';
import { Alert } from '../common/alert/Alert';
import { Loader } from '../common/loader/Loader';
import { bookFields } from '../../constants/formFields';
import { useBook } from '../../hooks/useBook';
import { useAuthor } from '../../hooks/useAuthor';
import { useBookAPI } from '../../hooks/useBookAPI';
import { useAuthorAPI } from '../../hooks/useAuthorAPI';

interface CreateBookProp {
    setShowModal: (value: boolean) => void
    isEdit: boolean
    rowId: number
    setIsEdit: (value: boolean) => void
}

const CreateBook: React.FC<CreateBookProp> = ({ setShowModal, isEdit, rowId, setIsEdit }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [alertProps, setAlertProps] = useState({
        type: 'success',
        message: 'Book created successfully'
    })

    const {
        formData,
        setFormData,
        isAlertVisible,
        setIsAlertVisible, 
    } = useBook()
    
    const { options, setOptions } = useAuthor()

    const { addBook, updateBook } = useBookAPI()
    const { getAuthor } = useAuthorAPI()

    const handleSearch = (option: string) => {
        setFormData({...formData, authorName: option}) 
        if(option.length >= 3 && /^[a-zA-Z]+$/.test(option)){
            debouncedSave(option)
            return
        }
    }

    const handleOptionChange = (selected: any) => {
        setFormData({...formData, authorName: selected[0] || ''})
    }

    const debouncedSave = useCallback(
        debounce(async (newValue: string) => {
            const result = await getAuthor({ search: newValue })
            const authorNames = result.data.map((author: any) => author.name)
            setOptions([...authorNames])
        }, 1000),
    [])

    const formFields = bookFields({ formData, options, onOptionChange: handleOptionChange, onInputChange: handleSearch })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newBook = {
            title: formData.title,
            published_year: formData.publishedYear || '',
            author: {
                name: formData.authorName
            } 
        }
        try {
            setIsLoading(true)
            if(isEdit){
                const updateProp = {
                    id: rowId,
                    title: formData.title,
                    published_year: formData.publishedYear || '',
                    author:{
                        name: formData.authorName
                    }
                }
                await updateBook(updateProp)
                setIsEdit(false)
                setShowModal(false)
                setFormData({authorName: '', title: '', publishedYear: ''})
                return
            }
            await addBook(newBook)
            setShowModal(false)
            setFormData({ authorName: '', title: '', publishedYear: '' })
            setAlertProps({ type: 'success', message: 'Book created successfully' })
        }
        catch (error) {
            setAlertProps({ type: 'error', message: 'Failed to create Book' })
        }
        finally {
            setIsLoading(false)
            setIsAlertVisible(true)
        }
    }

    const handleClose = () => {
        if(formData.authorName){
            setIsEdit(false)
            setFormData({authorName: '', title: '', publishedYear: ''})
        }
        setShowModal(false)
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
                title="Book Info"
                close={handleClose}
                body={
                    <CustomForm
                        fields={formFields}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                        buttonText={isEdit? 'Edit Book' : 'Create Book'}
                    />
                }
            />
        </>
    )
}

export default CreateBook
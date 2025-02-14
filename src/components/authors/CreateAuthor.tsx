import { useState } from 'react';
import { authorFields } from '../../constants/formFields';
import { CustomForm } from '../common/form/Form';
import { ModalLayout } from '../common/modal/Modal';
import { Alert } from '../common/alert/Alert';
import { Loader } from '../common/loader/Loader';
import { useAuthor } from '../../hooks/useAuthor';
import { useAuthorAPI } from '../../hooks/useAuthorAPI';
import { AuthorForm } from '../../types';
import { authorFormValidation } from '../../utils/validation';

interface CreateAuthorProp {
    setShowModal: (value: boolean) => void
    isEdit: boolean
    rowId: number
    setIsEdit: (value: boolean) => void
}

const CreateAuthor: React.FC<CreateAuthorProp> = ({ setShowModal, isEdit, rowId, setIsEdit }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [alertProps, setAlertProps] = useState({
        type: 'success',
        message: 'Author created successfully'
    })

    const {
        formData,
        setFormData,
        isAlertVisible,
        setIsAlertVisible,
        setErrors,
        errors
    } = useAuthor()

    const { addAuthor, updateAuthor } = useAuthorAPI()

    const formFields = authorFields({ formData, errors })

    const formValidationErrors = authorFormValidation(formData)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevState: AuthorForm) => ({
            ...prevState, 
            [name]: value
        }))
    }

    const handleEdit = async () => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (Object.keys(formValidationErrors).length > 0) {
            setErrors({ name: formValidationErrors.name || '', country: formValidationErrors.country || ''})
            return
        }
        try {
            setIsLoading(true)
            if(isEdit){
                await handleEdit()
            }
            else{
                await addAuthor(formData)
                setShowModal(false)
            }
            setAlertProps({ type: 'success', message: 'Author created successfully' })
            setIsAlertVisible(true)
        } catch (error) {
            setAlertProps({ type: 'error', message: `Error: ${error}` })
            setIsAlertVisible(true)
        } finally {
            setIsLoading(false)
            setFormData({ name: '', country: '' })
        }
    }

    const handleClose = () => {
        if(formData.name){
            setIsEdit(false)
            setFormData({ name: '', country: '' })
        }
        setErrors({ name: '', country: '' })
        setShowModal(false)
    }

    return (
        <>
            {isLoading && <Loader />}
            {
                <Alert
                    type={alertProps.type}
                    message={alertProps.message}
                    onClose={() => setIsAlertVisible(false)}
                />
            }
            <ModalLayout
                height={70}
                title="Author's Info"
                close={handleClose}
                body={
                    <CustomForm
                        fields={formFields}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        buttonText={isEdit ? 'Edit Author' : 'Create Author'}
                    />
                }
            />
        </>
    )
}

export default CreateAuthor
import { useState } from 'react';
import { authorFields } from '../../constants/formFields';
import { CustomForm } from '../common/form/Form';
import { ModalLayout } from '../common/modal/Modal';
import { Alert } from '../common/alert/Alert';
import { Loader } from '../common/loader/Loader';
import { useAuthor } from '../../hooks/useAuthor';
import { useAuthorAPI } from '../../hooks/useAuthorAPI';
import { AuthorForm } from '../../types';

interface CreateAuthorProp {
    setShowModal: (value: boolean) => void
}

const CreateAuthor: React.FC<CreateAuthorProp> = ({ setShowModal }) => {
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
    } = useAuthor()

    const { addAuthor } = useAuthorAPI()

    const formFields = authorFields({ formData })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevState: AuthorForm) => ({
            ...prevState, 
            [name]: value
          }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await addAuthor(formData)
            setShowModal(false)
            setFormData({ name: '', country: '' })
            setAlertProps({ type: 'success', message: 'Author created successfully' })
        } catch (error) {
            setAlertProps({ type: 'error', message: `Error: ${error}` })
        } finally {
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
                title="Author's Info"
                close={() => setShowModal(false)}
                body={
                    <CustomForm
                        fields={formFields}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        buttonText='Create Author'
                    />
                }
            />
        </>
    )
}

export default CreateAuthor
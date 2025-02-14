import { useState } from "react";
import { userFields } from "../../constants/formFields";
import { CustomForm } from "../common/form/Form";
import { ModalLayout } from "../common/modal/Modal";
import { Alert } from '../common/alert/Alert';
import { Loader } from '../common/loader/Loader';
import { useUser } from "../../hooks/useUser";
import { useUserAPI } from "../../hooks/useUserAPI";
import { UserFormProp } from "../../types";

interface CreateUserProp {
    setShowModal: (value: boolean) => void
    isEdit: boolean
    rowId: number
    setIsEdit: (value: boolean) => void
}

const CreateUser: React.FC<CreateUserProp> = ({ setShowModal, isEdit, rowId, setIsEdit }) => {
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
        roleData,
    } = useUser()
    const { addUser, updateUser } = useUserAPI()


    const handleOptionChange = (selected: any) => {
        setFormData({...formData, role: selected[0] || ''})
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevState: UserFormProp) => ({
            ...prevState,
            [name]: value
        }))
    }

    const formFields = userFields({ formData, isEdit, options: roleData, onChange: handleOptionChange })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            if(isEdit){
                const user = {
                    role: formData.role,
                    id: rowId
                }
                await updateUser(user)
                setShowModal(false)
                setIsEdit(false)
                setFormData(prev => ({
                    ...prev,
                    email: '',
                    role: ''
                }))
                return
            }
            await addUser(formData)
            setShowModal(false)
            setFormData({ email: '', password: '', role: '' })
            setAlertProps({ type: 'success', message: 'User created successfully' })
        } catch (error) {
            setAlertProps({ type: 'error', message: `Error: ${error}` })
        } finally {
            setIsLoading(false)
            setIsAlertVisible(true)
        }
    }

    const handleClose = () => {
        if(formData.email){
            setFormData(prev => ({
                ...prev,
                email: '',
                role: ''
            }))
            setIsEdit(false)
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
                title="User's Info"
                close={handleClose}
                body={ 
                    <CustomForm
                        fields={formFields}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        buttonText={isEdit ? 'Edit User' : 'Create User'}
                    />
                }
            />
        </>
    )
}

export default CreateUser
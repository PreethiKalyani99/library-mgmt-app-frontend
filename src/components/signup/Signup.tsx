import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomForm } from '../common/form/Form';
import { ModalLayout } from '../common/modal/Modal';
import { commonFields } from '../../constants/formFields';
import { commonFormValidation } from '../../utils/validation';
interface CreateUserProp {
    email: string
    password: string
}

const Signup: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })
    const formFields = commonFields(formData, errors)

    const CreateUser = async (user: CreateUserProp) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })

            if (!response.ok) {
                throw new Error(`Failed to create user, status: ${response.status}`)
            }

            const result = await response.json()
        } catch (error) {
            console.log(`Error Create user: ${error}`)
            throw error
        }
    }

    const formValidationErrors = commonFormValidation(formData, "signup")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (Object.keys(formValidationErrors).length > 0) {
            setErrors({
                email: formValidationErrors.email || '',
                password: formValidationErrors.password || ''
            })
            return
        }

        try {
            await CreateUser(formData)
            setFormData({ email: '', password: '' })
            setErrors({ email: '', password: '' })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <ModalLayout
                title='Signup'
                body={
                    <>
                        <CustomForm
                            fields={formFields}
                            onChange={handleInputChange}
                            onSubmit={handleSubmit}
                            buttonText='Signup'
                        />
                        <p className='text-form'>Already have an account <Link to='/'>Login</Link></p>
                    </>
                }
            />
        </>
    )
}

export default Signup
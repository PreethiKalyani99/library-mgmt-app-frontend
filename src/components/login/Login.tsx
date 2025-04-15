import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CustomForm } from '../common/form/Form';
import { ModalLayout } from '../common/modal/Modal';
import { commonFields } from '../../constants/formFields';
import { commonFormValidation } from '../../utils/validation';
import Cookies from 'js-cookie';

interface LoginUser {
    email: string
    password: string
}

const Login: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const { setToken } = useAuth()

    const formFields = commonFields(formData, errors)

    const formValidationErrors = commonFormValidation(formData, 'login')

    const loginUser = async (user: LoginUser) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })

            if (!response.ok) {
                throw new Error(`Failed to login, status: ${response.status}`)
            }

            const result = await response.json()
            setToken(result.token)
            Cookies.set('token', result.token, { expires: 1/24, secure: true })

        } catch (error) {
            console.log(`Error login user: ${error}`)
            throw error
        }
    }

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
        setIsLoading(true)
        try {
            await loginUser(formData)
            setFormData({ email: '', password: '' })
            setIsLoading(false)
            navigate('/home')
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
        finally{
            setIsLoading(false)
        }
    }
    
    return (
        <>
            <ModalLayout
                title="Login"
                body={
                    <>
                        <CustomForm
                            fields={formFields}
                            onChange={handleInputChange}
                            onSubmit={handleSubmit}
                            buttonText='Login'
                            isLoading={isLoading}
                        />
                        <p className='text-form'>Dont have an account {' '}
                            {isLoading ? 
                                <span className='disable text-decoration'>Signup</span> 
                                : 
                                <Link to='/signup'>Signup</Link>
                            }
                        </p>
                    </>
                }
            />
        </>
    )
}

export default Login
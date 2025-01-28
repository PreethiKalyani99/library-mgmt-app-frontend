import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardTitle, CardBody } from 'react-bootstrap';
import { useAuthToken } from '../../hooks/useAuthToken';
import { CustomForm } from '../common/form/Form';
import { commonFields } from '../../constants/formFields';
import styles from './Login.module.css'

interface LoginUser {
    email: string
    password: string
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })
    const { setToken } = useAuthToken()

    const formFields = commonFields(formData, errors)

    const navigate = useNavigate()

    const loginUser = async (user: LoginUser) => {
        try {
            const response = await fetch("https://library-mgmt-us4m.onrender.com/users/login", {
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
        console.log("in submit")
        e.preventDefault()

        setErrors({email: '', password: ''})
        
        const error: { email?: string; password?: string } = {}

        if(formData.email === ''){
            error.email = "Email is required"
        }
        if(formData.password === ''){
            error.password = "Password is required"
        }

        if (Object.keys(error).length > 0) {
            setErrors(prev => ({ ...prev, ...error }))
            return
        }
        try {
            await loginUser(formData)
            setFormData({email: '', password: ''})
            navigate('/author-form')
        } catch (error) {
            console.log(error)
        } 
    }
    return (
        <>
            <div className={styles.card_wrapper}>
                <Card className={styles.card_container}>
                    <CardTitle>Login</CardTitle>
                    <CardBody>
                        <CustomForm
                            fields={formFields}
                            onChange={handleInputChange}
                            onSubmit={handleSubmit}
                            buttonText='Login'
                        />
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default Login
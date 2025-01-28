import { useState } from 'react';
import { Card, CardTitle, CardBody } from 'react-bootstrap';
import { isEmailValid, isPasswordValid } from '../../utils/validation';
import { CustomForm } from '../common/form/Form';
import { commonFields } from '../../constants/formFields';
import styles from './Signup.module.css'

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
        password:''
    })
    const formFields = commonFields(formData, errors)

    const CreateUser = async (user: CreateUserProp) => {
        try {
            const response = await fetch("https://library-mgmt-us4m.onrender.com/users/sign-up", {
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({email: '', password: ''})
        
        const error: { email?: string; password?: string } = {}

        if (!isEmailValid(formData.email)) {
            error.email = 'Enter a valid email example@example.com'
        }
        if (!isPasswordValid(formData.password)) {
            error.password = 'Password should be at least 8 characters long'
        }
        
        if (Object.keys(error).length > 0) {
            setErrors(prev => ({ ...prev, ...error }))
            return
        }

        try {
            await CreateUser(formData)
            setFormData({email: '', password: ''})
            setErrors({email: '', password: ''})
        } catch (error) {
            console.log(error)
        } 
    }
    
    return (
        <div className={styles.card_wrapper}>
        <Card className={styles.card_container}>
            <CardTitle>Signup</CardTitle>
            <CardBody>
                <CustomForm
                    fields={formFields}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    buttonText='Signup'
                />
            </CardBody>
        </Card>
    </div>
    )
}

export default Signup
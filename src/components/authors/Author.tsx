import { useState } from 'react';
import { Card, CardTitle, CardBody } from 'react-bootstrap';
import AuthorForm from "./AuthorForm";
import { Alert } from '../common/alert/Alert';
import { Loader } from '../common/loader/Loader';
import { useAuthor } from '../../hooks/useAuthor';
import { useAuthorAPI } from '../../hooks/useAuthorAPI';
import styles from "./Author.module.css"

const Author: React.FC = () => {
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await addAuthor(formData)
            setFormData({ name: '', country: '' })
            setAlertProps({ type: 'success', message: 'Author created successfully'})
        } catch (error) {
            setAlertProps({ type: 'error', message: 'Failed to create Author'})
        } finally {
            setIsLoading(false)
            setIsAlertVisible(true)
        }
    }

    return (
        <>
            {isLoading && <Loader/>}
            {isAlertVisible &&
                <Alert
                    type={alertProps.type}
                    message={alertProps.message}
                    onClose={() => setIsAlertVisible(false)}
                />
            }
            <div className={styles.card_wrapper}>
                <Card className={styles.card_container}>
                    <CardTitle>Author's Info</CardTitle>
                    <CardBody>
                        <AuthorForm 
                            formData={formData}
                            onChange={handleInputChange}
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                        />
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default Author
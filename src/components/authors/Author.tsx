import { Card, CardTitle, CardBody } from 'react-bootstrap';
import AuthorForm from "./AuthorForm";
import { useAuthor } from '../../hooks/useAuthor';
import { useAuthorAPI } from '../../hooks/useAuthorAPI';
import styles from "./Author.module.css"

const Author: React.FC = () => {
    const { formData, setFormData } = useAuthor()
    const { addAuthor } = useAuthorAPI()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addAuthor(formData)
        setFormData({name: '', country: ''})
    }

    return (
        <div className={styles.card_wrapper}>
            <Card className={styles.card_container}>
                <CardTitle>Author's Info</CardTitle>
                <CardBody>
                    <AuthorForm 
                        formData={formData}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                    />
                </CardBody>
            </Card>
        </div>
    )
}

export default Author
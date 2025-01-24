import { Form, Button, FormGroup, FormLabel, FormControl } from "react-bootstrap"
import { FormData } from "../../types"
import styles from './Author.module.css'

interface AuthorFormProps {
    formData:  FormData
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: React.FormEvent) => void
}

const AuthorForm: React.FC<AuthorFormProps>  = ({ formData, onChange, onSubmit }) => {
    return (
        <Form onSubmit={onSubmit}>
            <FormGroup className="mb-3">
                <FormLabel className={styles.form_label}>Name</FormLabel>
                <FormControl
                    type="text"
                    placeholder="Enter name..."
                    value={formData.name}
                    name="name"
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup className="mb-3">
                <FormLabel className={styles.form_label}>Country</FormLabel>
                <FormControl
                    type="text"
                    placeholder="Enter country..."
                    value={formData.country}
                    name="country"
                    onChange={onChange}
                />
            </FormGroup>
            <Button
                type="submit"
                variant="primary"
            >
                Submit
            </Button>
        </Form>
    )
}

export default AuthorForm
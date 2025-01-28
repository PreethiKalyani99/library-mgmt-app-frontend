import { Form, Button, FormGroup, FormLabel, FormControl } from "react-bootstrap"
import styles from "./Form.module.css"


interface Field {
    label: string
    name: string
    type: string
    placeholder: string
    value: string
    error?: string
}

interface CustomFormProps {
    fields: Field[]
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: React.FormEvent) => void
    isLoading?: boolean
    buttonText?: string
}
export const CustomForm: React.FC<CustomFormProps> = ({ fields, onChange, onSubmit, isLoading = false, buttonText = 'Submit' }) => {
    return (
        <Form onSubmit={onSubmit}>
            <FormFields
                fields={fields}
                onChange={onChange}
            />
            <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
            >
                {buttonText}
            </Button>
        </Form>
    )
}

interface FormFieldsProps {
    fields: Field[]
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
}

const FormFields: React.FC<FormFieldsProps> = ({ fields, onChange }) => {
    return (
        <>
            {fields.map(field => (
                <FormGroup className="mb-3" key={field.label}>
                    <FormLabel className={styles.form_label}>{field.label}</FormLabel>
                    <FormControl
                        type={field.type}
                        placeholder={field.placeholder}
                        name={field.name}
                        value={field.value}
                        onChange={onChange}
                        isInvalid={!!field?.error || false}
                    />
                    {field?.error && <FormControl.Feedback type="invalid">{field.error}</FormControl.Feedback>}
                </FormGroup>
            ))}
        </>
    )
}
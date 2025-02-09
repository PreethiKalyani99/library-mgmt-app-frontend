import { Form, Button, FormGroup, FormLabel, FormControl } from "react-bootstrap"
import { Typeahead } from "react-bootstrap-typeahead"
import styles from "./Form.module.css"
import { Field } from "../../../types"

interface CustomFormProps {
    fields: Field[]
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSearch?: (selected: any) => void
    onSubmit: (e: React.FormEvent) => void
    isLoading?: boolean
    buttonText?: string
}
export const CustomForm: React.FC<CustomFormProps> = ({ fields, onChange, onSubmit, isLoading = false, buttonText = 'Submit', onSearch }) => {
    return (
        <Form onSubmit={onSubmit}>
            <FormFields
                fields={fields}
                onChange={onChange}
                onSearch={onSearch}
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
    onSearch?: (selected: any) => void
}

const FormFields: React.FC<FormFieldsProps> = ({ fields, onChange, onSearch }) => {
    const handleSearch = onSearch || (() => {})
    return (
        <>
            {fields.map(field => (
                <FormGroup className="mb-3" key={field.label}>
                    <FormLabel className={styles.form_label}>{field.label}</FormLabel>
                    {field?.autocomplete ?
                        <Autocomplete
                            field={field}
                            onChange={handleSearch}
                        />
                        :
                        <TextFields
                            field={field}
                            onChange={onChange}
                        />
                    }
                    {field?.error && <FormControl.Feedback type="invalid">{field.error}</FormControl.Feedback>}
                </FormGroup>
            ))}
        </>
    )
}

interface TextFieldsProps {
    field: Field
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextFields: React.FC<TextFieldsProps> = ({ field, onChange }) => {
    return (
        <FormControl
            type={field?.type}
            placeholder={field.placeholder}
            name={field.name}
            value={field.value}
            onChange={onChange}
            isInvalid={!!field?.error || false}
        />
    )
}

interface AutocompleteProps {
    field: Field
    onChange: (selected: any) => void
}

const Autocomplete: React.FC<AutocompleteProps> = ({ field, onChange }) => {
    return (
        <Typeahead
            id={`autocomplete-${field.name}`}
            onInputChange={onChange}
            options={field.option || []}
            placeholder={field.placeholder}
        />
    )
}
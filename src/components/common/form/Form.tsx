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
    onOptionChange?: (selected: any) => void
}
export const CustomForm: React.FC<CustomFormProps> = ({ fields, onChange, onSubmit, isLoading = false, buttonText = 'Submit', onSearch, onOptionChange }) => {
    return (
        <Form onSubmit={onSubmit}>
            <FormFields
                fields={fields}
                onChange={onChange}
                onSearch={onSearch}
                onOptionChange={onOptionChange}
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
    onSearch?: (str: string) => void
    onOptionChange?: (selected: any) => void
}

const FormFields: React.FC<FormFieldsProps> = ({ fields, onChange }) => {
    return (
        <>
            {fields.map(field => (
                <FormGroup className="mb-3" key={field.label}>
                    <FormLabel className={styles.form_label}>{field.label}</FormLabel>
                    {field?.autocomplete ?
                        <Autocomplete
                            field={field}
                            onChange={field.onChange || (() => {})}
                            onInputChange={field.inputChange || (() => {})}
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
            disabled={field.disabled ?? false}
        />
    )
}

interface AutocompleteProps {
    field: Field
    onChange: (selected: any) => void
    onInputChange: (str: string) => void
}

const Autocomplete: React.FC<AutocompleteProps> = ({ field, onChange, onInputChange }) => {
    return (
        <Typeahead
            id={`autocomplete-${field.name}`}
            onInputChange={onInputChange}
            options={field.option || []}
            placeholder={field.placeholder}
            selected={field.value ? [field.value] : []}
            onChange={onChange}
            disabled={field.disabled ?? false}
            isInvalid={!!field?.error || false}
        />
    )
}
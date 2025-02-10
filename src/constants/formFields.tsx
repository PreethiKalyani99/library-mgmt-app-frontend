import { BookForm, AuthorForm, Field } from "../types"

interface Data {
    email: string
    password: string
}

export const commonFields = (formData: Data, errors: Data) => [
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'Enter email...',
        value: formData.email,
        error: errors.email
    },
    {
        label: 'Password',
        name: 'password',
        type: 'password',
        placeholder: 'Enter password...',
        value: formData.password,
        error: errors.password 
    }
]

interface authorFieldProps {
    formData: AuthorForm
    errors?: AuthorForm
}

export const authorFields = ({ formData, errors }: authorFieldProps) => [
    {
        label: 'Name',
        name: 'name',
        type: 'text',
        placeholder: 'Enter Name...',
        value: formData.name,
        error: errors?.name
    },
    {
        label: 'Country',
        name: 'country',
        type: 'text',
        placeholder: 'Enter country...',
        value: formData?.country || '',
        error: errors?.country
    }
]

interface FormProp {
    authorName: string
    title: string
    publishedYear?: string
}
interface BookFieldProps {
    formData: FormProp
    errors?: FormProp
    options?: string[]
}

export const bookFields = ({ formData, errors, options }: BookFieldProps): Field[] => [
    {
        autocomplete: true,
        label: 'Author Name',
        name: 'authorName',
        placeholder: 'Search author name...',
        error: errors?.authorName,
        option: options,
        value: formData.authorName
    },
    {
        label: 'Title',
        name: 'title',
        type: 'text',
        placeholder: 'Enter title...',
        value: formData.title,
        error: errors?.title
    },
    {
        label: 'Published Year',
        name: 'publishedYear',
        type: 'text',
        placeholder: 'Enter Title...',
        value: formData.publishedYear || ''
    } 
]
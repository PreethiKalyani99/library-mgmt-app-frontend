import { BookForm } from "../types"

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

interface AuthorData {
    name: string
    country: string
}
interface authorFieldProps {
    formData: AuthorData
    errors?: AuthorData
}

export const authorFields = ({ formData, errors }: authorFieldProps) => [
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'Enter email...',
        value: formData.name,
        error: errors?.name
    },
    {
        label: 'Password',
        name: 'password',
        type: 'password',
        placeholder: 'Enter password...',
        value: formData.country,
        error: errors?.country
    }
]
interface BookFormErrors {
    authorName: string
    title: string
    publishedYear?: string
}
interface BookFieldProps {
    formData: BookForm
    errors?: BookFormErrors
}

export const bookFields = ({ formData, errors }: BookFieldProps) => [
    {
        label: 'Author Name',
        name: 'authorName',
        type: 'text',
        placeholder: 'Enter author name...',
        value: formData.authorName,
        error: errors?.authorName
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
        label: 'Title',
        name: 'publishedYear',
        type: 'text',
        placeholder: 'Enter Title...',
        value: formData.publishedYear || ''
    }

]
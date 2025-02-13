import { AuthorForm, Field } from "../types"

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
    isEdit?: boolean
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
    onInputChange?: (option: string) => void,
    onOptionChange?: (selected: any) => void,
    isEdit?: boolean
}

export const bookFields = ({ formData, errors, options, onInputChange, onOptionChange }: BookFieldProps): Field[] => [
    {
        autocomplete: true,
        label: 'Author Name',
        name: 'authorName',
        placeholder: 'Search author name...',
        error: errors?.authorName,
        option: options,
        value: formData.authorName,
        inputChange: onInputChange,
        onChange: onOptionChange,
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

interface UserFormProp {
    email: string
    password: string
    role: string
}
interface UserFieldProp {
    formData: UserFormProp
    errors?: UserFormProp
    isEdit?: boolean
}

export const userFields = ({ formData, errors, isEdit }: UserFieldProp) => [
    {
        label: "Email",
        name: 'email',
        type: 'email',
        placeholder: 'Enter Email...',
        value: formData.email,
        error: errors?.email,
        disabled: isEdit
    },
    {
        label: "Password",
        name: 'password',
        type: 'password',
        placeholder: 'Enter Password...',
        value: formData.password,
        error: errors?.password,
        disabled: isEdit,
    },
    {
        label: "Role",
        name: 'role',
        type: 'text',
        placeholder: 'Enter Role...',
        value: formData.role,
        error: errors?.role,
    },
]

interface BorrowFormProp {
    title: string
    borrower: string
    borrowDate: string
    returnDate: string
}
interface BorrowFieldProp {
    formData: BorrowFormProp
    errors?: BorrowFormProp
    bookInputChange: (selected: any) => void
    userInputChange: (selected: any) => void
    onBookChange: (selected: string) => void
    onUserChange: (selected: string) => void
    bookOptions: any
    userOptions: any
    isEdit?: boolean
}

export const borrowFields = ({ formData, errors, bookInputChange, userInputChange, onBookChange, onUserChange, bookOptions, userOptions }: BorrowFieldProp) => [
    {
        autocomplete: true,
        label: "Title",
        name: 'title',
        error: errors?.title,
        placeholder: 'Search title...',
        value: formData.title,
        inputChange: bookInputChange,
        onChange: onBookChange,
        option: bookOptions
    },
    {
        autocomplete: true,
        label: "User",
        name: 'borrower',
        placeholder: 'Search user...',
        value: formData.borrower,
        error: errors?.borrower,
        inputChange: userInputChange,
        onChange: onUserChange,
        option: userOptions
    },
    {
        label: "Borrow Date",
        name: 'borrowDate',
        type: 'date',
        placeholder: 'Borrow Date',
        value: formData.borrowDate,
        error: errors?.borrowDate,
    },
    {
        label: "Return Date",
        name: 'returnDate',
        type: 'date',
        placeholder: 'Return Date',
        value: formData.returnDate,
        error: errors?.returnDate,
    },
]
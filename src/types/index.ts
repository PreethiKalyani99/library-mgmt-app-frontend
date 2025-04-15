import { ReactNode } from "react"

export type ProviderProp =  {
    children: ReactNode
}

export type AuthorForm = {
    author_id?: number
    name: string
    country?: string
}

export type RoleProp = {
    role: string
}

export type UserForm = {
    user_id: number
    email: string
    role: RoleProp
}

export type BookData = {
    book_id?: number
    title: string
    published_year?: number
}

export type BookForm = {
    book_id: number
    title: string
    published_year?: number
    author: AuthorForm
}

export type UserType = {
    user_id?: number
    email: string
}

export type BorrowFormData = {
    id?: number
    borrow_date: string
    return_date?: string | null
    book: BookData
    borrower: UserType
}

export type BorrowDataProp = {
    id?: number
    borrow_date: string
    return_date?: string | null
    books: BookData
    users: UserType
}

export type Field = {
    autocomplete?: boolean
    disabled?: boolean
    label: string
    name: string
    type?: string
    placeholder: string
    value: string
    error?: string
    as?: string
    children?: ReactNode
    option?: string[]
    onChange?: (selected: any) => void
    inputChange?: (option: string) => void
}

export type GetApiProp = {
    search?: string
    pageNumber?: number
    pageSize?: number
}

export type UserFormProp = {
    email: string
    password: string
    role: string
}
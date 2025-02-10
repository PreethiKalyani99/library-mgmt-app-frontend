import { ReactNode } from "react"

export type ProviderProp =  {
    children: ReactNode
}

export type AuthorForm = {
    author_id?: number
    name: string
    country?: string
}

export type UserForm = {
    user_id: number
    email: string
}

export type BookForm = {
    book_id: number
    title: string
    published_year?: number
    author: AuthorForm
    users: UserForm
}

export type Field = {
    autocomplete?: boolean
    label: string
    name: string
    type?: string
    placeholder: string
    value?: string
    error?: string
    as?: string
    children?: ReactNode
    option?: string[]
}

export type GetApiProp = {
    search?: string
    pageNumber?: number
    pageSize?: number
}
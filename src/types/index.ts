import { ReactNode } from "react"

export type ProviderProp =  {
    children: ReactNode
}

export type AuthorForm = {
    author_id?: number
    name: string
    country?: string
}

export type BookForm = {
    authorName: string
    title: string
    publishedYear?: string
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
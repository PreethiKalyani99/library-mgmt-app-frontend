import { ReactNode } from "react"

export type ProviderProp =  {
    children: ReactNode
}

export type AuthorForm = {
    name: string
    country: string
}

export type BookForm = {
    authorName: string
    title: string
    publishedYear?: string
}
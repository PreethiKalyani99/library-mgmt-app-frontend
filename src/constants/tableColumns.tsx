import { roles } from "./roles"

export const userColumn = [
    {
        id: 1,
        title: 'Email',
        width: 200
    },
    {
        id: 2,
        title: 'Role',
        width: 200 
    },
    {
        id: 3,
        title: 'Actions',
        roles: [roles.ADMIN],
        width: 100
    }
]

export const authorColumns = [
    {
        id: 1,
        title: 'Name',
        width: 200
    },
    {
        id: 2,
        title: 'Country',
        width: 200
    },
    {
        id: 3,
        title: 'Actions',
        roles: [roles.ADMIN, roles.LIBRARIAN],
        width: 100
    }
]

export const bookColumns = [
    {
        id: 1,
        title: 'Book Title',
        width: 200
    },
    {
        id: 2,
        title: 'Author',
        width: 200
    },
    {
        id: 3,
        title: 'Published Year',
        width: 200
    },
    {
        id: 4,
        title: 'Actions',
        roles: [roles.ADMIN, roles.LIBRARIAN],
        width: 100
    }
]
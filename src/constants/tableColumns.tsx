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
import { roles } from "./roles"

export const nav = [
    {
        name: 'User Management',
        path: '/home/user-management',
        roles: [roles.ADMIN],
        tab: 'users',
    },
    {
        name: 'Authors',
        path: '/home/authors',
        roles: [roles.ADMIN, roles.LIBRARIAN, roles.RECEPTIONIST, roles.READER],
        tab: 'authors',
    },
    {
        name: 'Books',
        path: '/home/books',
        roles: [roles.ADMIN, roles.LIBRARIAN, roles.RECEPTIONIST, roles.READER],
        tab: 'books',
    },
    {
        name: 'Borrowed Books',
        path: '/home/borrowed-books',
        roles: [roles.ADMIN, roles.LIBRARIAN, roles.RECEPTIONIST],
        tab: 'borrow',
    }
]
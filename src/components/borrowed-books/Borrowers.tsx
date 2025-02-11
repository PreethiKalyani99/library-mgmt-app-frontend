import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useBorrowAPI } from "../../hooks/useBorrowAPI";
import { useBorrow } from "../../hooks/useBorrow";
import { Table } from "../common/table/Table";
import { Pagination } from "../common/table/Pagination";
import { Search } from "../common/search/Search";
import { roles } from "../../constants/roles";
import CreateBorrowedBook from "./CreateBorrowedBook";
import styles from "./Borrowers.module.css"

interface BorrowersProp {
    userId?: number | undefined
}

export default function Borrowers({ userId }: BorrowersProp) {
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()
    const { role } = useAuth()
    const { getBorrower, getBorrowerById } = useBorrowAPI()
    const { borrowData, count, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage, query, setQuery } = useBorrow()
    useEffect(() => {
        try {
            if (userId && role === roles.READER) {
                getBorrowerById({ id: userId, pageNumber: currentPage, pageSize: rowsPerPage })
                return
            }
            if (role === roles.ADMIN || role === roles.LIBRARIAN || role === roles.RECEPTIONIST) {
                getBorrower({ pageNumber: currentPage, pageSize: rowsPerPage })
                return
            }
        }
        catch (error) {
            console.error("Error decoding token", error)
            navigate("/")
        }
    }, [role, currentPage, rowsPerPage, userId])

    const columnData = [
        {
            id: 1,
            title: 'Book Title',
            width: 200
        },
        {
            id: 2,
            title: 'Borrower',
            width: 200
        },
        {
            id: 3,
            title: 'Borrow Date',
            width: 200
        },
        {
            id: 4,
            title: 'Return Date',
            width: 200
        },
        {
            id: 5,
            title: 'Actions',
            roles: [roles.ADMIN, roles.LIBRARIAN, roles.RECEPTIONIST],
            width: 100
        }
    ]

    const rowData = borrowData?.map(borrower => {
        return {
            id: borrower.id ?? 0,
            cells: [
                {
                    cellData: borrower.books.title
                },
                {
                    cellData: borrower.users.email
                },
                {
                    cellData: borrower.borrow_date
                },
                {
                    cellData: borrower.return_date ?? 'Not returned'
                },
                {
                    cellData: borrower.id
                }
            ]
        }
    })

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        if (userId && value === '') {
            await getBorrower({})
        }
    }

    const handleSearch = async () => {
        if (userId && query.length >= 3 && /^[a-zA-Z0-9@.]+$/.test(query)) {
            await getBorrower({ search: query })
        }
    }

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const handleAddBooks = () => {
        setShowModal(!showModal)
    }

    return (
        <div className={styles.author_container}>
            <div className={styles.search_container}>
                <div className={styles.search_wrapper}>
                    <Search
                        value={query}
                        onChange={handleChange}
                        onSearch={handleSearch}
                        onkeydown={onKeyDown}
                        placeholder="Search by Book title or Borrower..."
                    />
                </div>
                {
                    (role === roles.ADMIN || role === roles.LIBRARIAN)
                    &&
                    <button
                        className={styles.add_btn}
                        onClick={handleAddBooks}
                    >
                        + Add Borrower
                    </button>
                }
            </div>

            <div className={styles.table_container}>
                <Table
                    columnData={columnData}
                    rowData={rowData}
                />
                <Pagination
                    count={count}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                />
            </div>
            {showModal && <CreateBorrowedBook setShowModal={setShowModal} />}
        </div>
    )
}
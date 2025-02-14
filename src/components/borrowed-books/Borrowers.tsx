import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useBorrowAPI } from "../../hooks/useBorrowAPI";
import { useBorrow } from "../../hooks/useBorrow";
import { Table } from "../common/table/Table";
import { Pagination } from "../common/table/Pagination";
import { Search } from "../common/search/Search";
import { roles } from "../../constants/roles";
import { borrowBookColumns } from "../../constants/tableColumns";
import CreateBorrowedBook from "./CreateBorrowedBook";
import Actions from "../actions/Actions";
import styles from "./Borrowers.module.css"

interface BorrowersProp {
    userId?: number | undefined
}

export default function Borrowers({ userId }: BorrowersProp) { 
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [rowId, setRowId] = useState(0)

    const { role } = useAuth()
    const { getBorrower, getBorrowerById } = useBorrowAPI()
    const { borrowData, count, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage, query, setQuery, setFormData } = useBorrow()

    useEffect(() => {
        if (userId && role === roles.READER) {
            getBorrowerById({ id: userId, pageNumber: currentPage, pageSize: rowsPerPage })
            return
        }
        if (role === roles.ADMIN || role === roles.LIBRARIAN || role === roles.RECEPTIONIST) {
            getBorrower({ pageNumber: currentPage, pageSize: rowsPerPage })
            return
        }
    }, [role, currentPage, rowsPerPage, userId])

    const toggleModal = () => {
        setShowModal(!showModal) 
    }

    const handleEdit = (id: number) => {
        toggleModal()
        setIsEdit(true)
        setRowId(id)
        const borrower = borrowData.find(user => user.id === id)
        if (!borrower) {
            console.error("Borrower not found");
            return
        }

        setFormData({
            title: borrower.books.title,
            borrower: borrower.users.email,
            borrowDate: borrower.borrow_date,
            returnDate: borrower.return_date || '',
        })
    }

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
                    cellData: (<Actions onEdit={() => handleEdit(borrower.id || 0)}/>)
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
                        onClick={toggleModal}
                    >
                        + Add Borrower
                    </button>
                }
            </div>

            <div className={styles.table_container}>
                <Table
                    columnData={borrowBookColumns}
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
            {showModal && 
                <CreateBorrowedBook 
                    setShowModal={setShowModal} 
                    isEdit={isEdit}
                    rowId={rowId}
                    setIsEdit={setIsEdit}
                />
            }
        </div>
    )
}
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useBorrowAPI } from "../../hooks/useBorrowAPI";
import { useBorrowHandlers } from "../../hooks/useBorrowHandlers";
import { useBorrow } from "../../hooks/useBorrow";
import { Table } from "../common/table/Table";
import { Pagination } from "../common/table/Pagination";
import { Search } from "../common/search/Search";
import { roles } from "../../constants/roles";
import { borrowBookColumns } from "../../constants/tableColumns";
import CreateBorrowedBook from "./CreateBorrowedBook";

interface BorrowersProp {
    userId?: number 
}

export default function Borrowers({ userId }: BorrowersProp) { 
    const { role } = useAuth()
    const { getBorrower, getBorrowerById } = useBorrowAPI()
    const { 
        count, 
        currentPage, 
        setCurrentPage, 
        rowsPerPage, 
        setRowsPerPage, 
        query, 
        showModal,
    } = useBorrow()

    const {
        handleChange,
        handleSearch,
        onKeyDown,
        toggleModal,
        rowData
    } = useBorrowHandlers()

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

    return (
        <div className='content-container'>
            <div className='search-container'>
                <div className='search-wrapper'>
                    <Search
                        value={query}
                        onChange={(e) =>handleChange(e, userId)}
                        onSearch={() => handleSearch(userId)}
                        onkeydown={(e) => onKeyDown(e, userId)}
                        placeholder="Search by Book title or Borrower..."
                    />
                </div>
                {
                    (role === roles.ADMIN || role === roles.LIBRARIAN)
                    &&
                    <button
                        className='add-btn'
                        onClick={toggleModal}
                    >
                        + Add Borrower
                    </button>
                }
            </div>

            <div className='table-container'>
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
            {showModal && <CreateBorrowedBook /> }
        </div>
    )
}
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useBookAPI } from "../../hooks/useBookAPI";
import { useBookHandlers } from "../../hooks/useBookHandlers";
import { useBook } from "../../hooks/useBook";
import { Table } from "../common/table/Table";
import { Pagination } from "../common/table/Pagination";
import { Search } from "../common/search/Search";
import { roles } from "../../constants/roles";
import { bookColumns } from "../../constants/tableColumns";
import CreateBook from "./CreateBook";

export default function Books() {
    const { role } = useAuth()
    const { 
        toggleModal,
        handleSearch,
        handleChange,
        onKeyDown,
        rowData
    } = useBookHandlers()
    
    const { getBook } = useBookAPI()
    const { count, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage, query, showModal } = useBook()

    useEffect(() => {
        getBook({ pageNumber: currentPage, pageSize: rowsPerPage })
    }, [currentPage, rowsPerPage])

    return (
        <div className='content-container'>
            <div className='search-container'>
                <div className='search-wrapper'>
                    <Search
                        value={query}
                        onChange={handleChange}
                        onSearch={handleSearch}
                        onkeydown={onKeyDown}
                        placeholder="Search by Book title, Author or Year..."
                    />
                </div>
                {
                    (role === roles.ADMIN || role === roles.LIBRARIAN)
                    &&
                    <button
                        className='add-btn'
                        onClick={toggleModal}
                    >
                        + Add Book
                    </button>
                }
            </div>

            <div className='table-container'>
                <Table
                    columnData={bookColumns}
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
            {showModal && <CreateBook /> }
        </div>
    )
}
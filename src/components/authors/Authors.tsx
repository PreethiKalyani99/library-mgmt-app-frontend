import { useEffect } from "react";
import { Table } from "../common/table/Table";
import { Pagination } from "../common/table/Pagination";
import { Search } from "../common/search/Search";
import { useAuthorAPI } from "../../hooks/useAuthorAPI";
import { useAuthor } from "../../hooks/useAuthor";
import { roles } from "../../constants/roles";
import { useAuth } from "../../hooks/useAuth";
import { useAuthorHandlers } from "../../hooks/useAuthorHandlers";
import { authorColumns } from "../../constants/tableColumns";
import CreateAuthor from "./CreateAuthor";

export default function Authors() {
    const { 
        count, 
        currentPage, 
        setCurrentPage, 
        rowsPerPage, 
        setRowsPerPage, 
        query, 
        showModal,

    } = useAuthor()

    const { 
        handleChange,
        handleSearch,
        onKeyDown,
        toggleModal,
        rowData,

    } = useAuthorHandlers()

    const { role } = useAuth()
    const { getAuthor } = useAuthorAPI()

    useEffect(() => {
        getAuthor({ pageNumber: currentPage, pageSize: rowsPerPage })
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
                        placeholder="Search by Name or Country..."
                    />
                </div>
                    {
                        (role === roles.ADMIN || role === roles.LIBRARIAN) 
                        && 
                        <button 
                            className='add-btn'
                            onClick={toggleModal}
                        >
                            + Add Author
                        </button>
                    }
            </div>

            <div>
                <div className={rowsPerPage > 10 ? 'table-container' : ''}>
                    <Table
                        columnData={authorColumns}
                        rowData={rowData}
                    />
                </div>
                <Pagination
                    count={count}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                />
            </div>
            {showModal && <CreateAuthor />}
        </div>
    )
}
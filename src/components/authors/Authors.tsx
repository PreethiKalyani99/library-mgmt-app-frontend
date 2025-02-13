import { useEffect, useState } from "react";
import { Table } from "../common/table/Table";
import { Pagination } from "../common/table/Pagination";
import { Search } from "../common/search/Search";
import { useAuthorAPI } from "../../hooks/useAuthorAPI";
import { useAuthor } from "../../hooks/useAuthor";
import { roles } from "../../constants/roles";
import { useAuth } from "../../hooks/useAuth";
import { authorColumns } from "../../constants/tableColumns";
import CreateAuthor from "./CreateAuthor";
import Actions from "../actions/Actions";
import styles from "./Authors.module.css"

export default function Authors() {
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [rowId, setRowId] = useState(0)

    const { authorData, count, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage, query, setQuery } = useAuthor()

    const { role } = useAuth()
    const { getAuthor, deleteAuthor } = useAuthorAPI()

    useEffect(() => {
        getAuthor({ pageNumber: currentPage, pageSize: rowsPerPage })
    }, [currentPage, rowsPerPage])

    const toggleModal = () => {
        setShowModal(!showModal) 
    }

    const handleEdit = (id: number) => {
        toggleModal()
        setIsEdit(true)
        setRowId(id)
    }

    const handleDelete = (id: number) => {
        deleteAuthor(id)
    }

    const rowData = authorData?.map(author => {
        return {
            id: author.author_id ?? 0,
            cells: [
                {
                    cellData: author.name
                },
                {
                    cellData: author.country ?? '-'
                },
                {
                    cellData: (<Actions onEdit={() => handleEdit(author.author_id || 0)} onDelete={() => handleDelete(author.author_id || 0)}/>)
                }
            ]
        }
    })

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        if(value === ''){
            await getAuthor({})
        }
    }

    const handleSearch = async () => {
        if(query.length >= 3 && /^[a-zA-Z]+$/.test(query)){
            await getAuthor({ search: query})
        }
    }

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(e.key === 'Enter'){
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
                        placeholder="Search by Name or Country..."
                        />
                </div>
                    {
                        (role === roles.ADMIN || role === roles.LIBRARIAN) 
                        && 
                        <button 
                            className={styles.add_btn}
                            onClick={toggleModal}
                        >
                            + Add Author
                        </button>
                    }
            </div>

            <div className={styles.table_container}>
                <Table
                    columnData={authorColumns}
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
                <CreateAuthor 
                    setShowModal={setShowModal}
                    isEdit={isEdit}
                    rowId={rowId}
                />
            }
        </div>
    )
}
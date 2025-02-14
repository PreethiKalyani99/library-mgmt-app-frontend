import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useBookAPI } from "../../hooks/useBookAPI";
import { useBook } from "../../hooks/useBook";
import { Table } from "../common/table/Table";
import { Pagination } from "../common/table/Pagination";
import { Search } from "../common/search/Search";
import { roles } from "../../constants/roles";
import { bookColumns } from "../../constants/tableColumns";
import CreateBook from "./CreateBook";
import Actions from "../actions/Actions";
import styles from "./Books.module.css"

export default function Books() {
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [rowId, setRowId] = useState(0)

    const { role } = useAuth()
    const { getBook, deleteBook } = useBookAPI()
    const { bookData, count, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage, query, setQuery, setFormData } = useBook()

    useEffect(() => {
        getBook({ pageNumber: currentPage, pageSize: rowsPerPage })
    }, [currentPage, rowsPerPage])


    const toggleModal = () => {
        setShowModal(!showModal) 
    }

    const handleEdit = (id: number) => {
        toggleModal()
        setIsEdit(true)
        setRowId(id)

        const book = bookData.find(item => item.book_id === id)
        if(!book){
            console.log("book not found")
            return 
        }
        setFormData({authorName: book.author.name, title: book.title, publishedYear: book.published_year?.toString()})
    }

    const handleDelete = (id: number) => {
        deleteBook(id)
    }

    const rowData = bookData?.map(book => {
        return {
            id: book.book_id,
            cells: [
                {
                    cellData: book.title
                },
                {
                    cellData: book.author.name
                },
                {
                    cellData: book.published_year ?? '-'
                },
                {
                    cellData: (<Actions onEdit={() => handleEdit(book.book_id)} onDelete={() => handleDelete(book.book_id)}/>)
                }
            ]
        }
    })

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        if (value === '') {
            await getBook({})
        }
    }

    const handleSearch = async () => {
        if (query.length >= 3 && /^[a-zA-Z0-9]+$/.test(query)) {
            await getBook({ search: query })
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
                        placeholder="Search by Book title, Author or Year..."
                    />
                </div>
                {
                    (role === roles.ADMIN || role === roles.LIBRARIAN)
                    &&
                    <button
                        className={styles.add_btn}
                        onClick={toggleModal}
                    >
                        + Add Book
                    </button>
                }
            </div>

            <div className={styles.table_container}>
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
            {showModal && 
                <CreateBook 
                    setShowModal={setShowModal}
                    isEdit={isEdit}
                    rowId={rowId} 
                    setIsEdit={setIsEdit}
                />
            }
        </div>
    )
}
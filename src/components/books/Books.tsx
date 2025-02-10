import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useBookAPI } from "../../hooks/useBookAPI";
import { useBook } from "../../hooks/useBook";
import { Table } from "../common/table/Table";
import { Pagination } from "../common/table/Pagination";
import { Search } from "../common/search/Search";
import { roles } from "../../constants/roles";
import CreateBook from "./CreateBook";
import styles from "./Books.module.css"

export default function Books() {
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()
    const { role } = useAuth()
    const { getBook } = useBookAPI()
    const { bookData, count, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage, query, setQuery } = useBook()

    useEffect(() => {
            try {
                if (role) {
                    getBook({ pageNumber: currentPage, pageSize: rowsPerPage })
                }
            } catch (error) {
                console.error("Error decoding token", error)
                navigate("/")
            }
        }, [role, currentPage, rowsPerPage])

        const columnData = [
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
                        cellData: book.book_id
                    }
                ]
            }
        })

        const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            setQuery(value)
    
            if(value === ''){
                await getBook({})
            }
        }
    
        const handleSearch = async () => {
            if(query.length >= 3 && /^[a-zA-Z0-9]+$/.test(query)){
                await getBook({ search: query})
            }
        }
    
        const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
            if(e.key === 'Enter'){
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
                            placeholder="Search by Book title, Author or Year..."
                            />
                    </div>
                        {
                            (role === roles.ADMIN || role === roles.LIBRARIAN) 
                            && 
                            <button 
                                className={styles.add_btn}
                                onClick={handleAddBooks}
                            >
                                + Add Book
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
                {showModal && <CreateBook setShowModal={setShowModal}/>}
            </div>
        )
}
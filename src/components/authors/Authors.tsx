import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Table } from "../common/table/Table";
import { Pagination } from "../common/table/Pagination";
import { Search } from "../common/search/Search";
import { useAuthorAPI } from "../../hooks/useAuthorAPI";
import { useAuthor } from "../../hooks/useAuthor";
import { roles } from "../../constants/roles";
import { useAuth } from "../../hooks/useAuth";
import CreateAuthor from "./CreateAuthor";
import styles from "./Authors.module.css"

interface JwtPayload {
    role: string
}

export default function Authors() {
    const [showModal, setShowModal] = useState(false)
    const { authorData, count, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage, query, setQuery } = useAuthor()
    const navigate = useNavigate()

    const { setRole, role } = useAuth()
    const { getAuthor } = useAuthorAPI()

    const token = localStorage.getItem("token") || ''
    useEffect(() => {
        try {
            if (token) {
                const userRole = jwtDecode(token) as JwtPayload
                setRole(userRole.role || "")
                getAuthor({ pageNumber: currentPage, pageSize: rowsPerPage })
            }
        } catch (error) {
            console.error("Error decoding token", error)
            navigate("/")
        }
    }, [token, currentPage, rowsPerPage])

    const columnData = [
        {
            id: 1,
            title: 'Name',
            width: 200
        },
        {
            id: 2,
            title: 'Country',
            width: 200
        },
        {
            id: 3,
            title: 'Actions',
            roles: [roles.ADMIN, roles.LIBRARIAN],
            width: 100
        }
    ]

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
                    cellData: author.author_id
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

    const handleAddAuthors = () => {
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
                        placeholder="Search by Name or Country..."
                        />
                </div>
                    {
                        (role === roles.ADMIN || role === roles.LIBRARIAN) 
                        && 
                        <button 
                            className={styles.add_btn}
                            onClick={handleAddAuthors}
                        >
                            + Add Author
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
            {showModal && <CreateAuthor setShowModal={setShowModal}/>}
        </div>
    )
}
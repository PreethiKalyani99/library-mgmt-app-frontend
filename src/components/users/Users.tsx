import { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { useAuth } from "../../hooks/useAuth";
import { useUserAPI } from "../../hooks/useUserAPI";
import { roles } from "../../constants/roles";
import { Table } from "../common/table/Table";
import { Pagination } from "../common/table/Pagination";
import { Search } from "../common/search/Search";
import CreateUser from "./CreateUser";
import styles from "./Users.module.css"

export default function Users() {
    const [showModal, setShowModal] = useState(false)
    const { userData, count, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage, query, setQuery } = useUser()
    const { role } = useAuth()
    const { getUser } = useUserAPI()

    useEffect(() => {
        if(role === roles.ADMIN){
            getUser({ pageNumber: currentPage, pageSize: rowsPerPage })
        }
    }, [currentPage, rowsPerPage])

    const columnData = [
        {
            id: 1,
            title: 'Email',
            width: 200
        },
        {
            id: 2,
            title: 'Actions',
            roles: [roles.ADMIN],
            width: 100
        }
    ]

    const rowData = userData?.map(user => {
        return {
            id: user.user_id ?? 0,
            cells: [
                {
                    cellData: user.email
                },
                {
                    cellData: user.user_id
                },
            ]
        }
    })

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        if(value === ''){
            await getUser({})
        }
    }

    const handleSearch = async () => {
        if(query.length >= 3 && /^[a-zA-Z0-9@.]+$/.test(query)){
            await getUser({ search: query})
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
                        placeholder="Search by Email..."
                        />
                </div>
                    {
                        (role === roles.ADMIN) 
                        && 
                        <button 
                            className={styles.add_btn}
                            onClick={handleAddAuthors}
                        >
                            + Add User
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
            {showModal && <CreateUser setShowModal={setShowModal}/>}
        </div>
    )
}
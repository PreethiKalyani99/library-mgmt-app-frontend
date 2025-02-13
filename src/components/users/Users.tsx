import { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { useAuth } from "../../hooks/useAuth";
import { useUserAPI } from "../../hooks/useUserAPI";
import { roles } from "../../constants/roles";
import { userColumn } from "../../constants/tableColumns";
import { Table } from "../common/table/Table";
import { Pagination } from "../common/table/Pagination";
import { Search } from "../common/search/Search";
import CreateUser from "./CreateUser";
import Actions from "../actions/Actions";
import styles from "./Users.module.css"

export default function Users() {
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [rowId, setRowId] = useState(0)

    const { userData, count, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage, query, setQuery } = useUser()
    const { role } = useAuth() 
    const { getUser } = useUserAPI()

    useEffect(() => {
        if(role === roles.ADMIN){
            getUser({ pageNumber: currentPage, pageSize: rowsPerPage })
        }
    }, [currentPage, rowsPerPage])

    const toggleModal = () => {
        setShowModal(!showModal) 
    }

    const handleEdit = (id: number) => {
        toggleModal()
        setIsEdit(true)
        setRowId(id)
    }

    const rowData = userData?.map(user => {
        return {
            id: user.user_id,
            cells: [
                {
                    cellData: user.email
                },
                {
                    cellData: user?.role?.role ?? '-'
                },
                {
                    cellData: (<Actions onEdit={() => handleEdit(user.user_id)}/>)
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
                            onClick={toggleModal}
                        >
                            + Add User
                        </button>
                    }
            </div>

            <div className={styles.table_container}>
                <Table
                    columnData={userColumn}
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
                <CreateUser 
                    setShowModal={setShowModal}
                    isEdit={isEdit}
                    rowId={rowId}
                />
            }
        </div>
    )
}
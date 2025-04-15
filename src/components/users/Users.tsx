import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { useAuth } from "../../hooks/useAuth";
import { useUserAPI } from "../../hooks/useUserAPI";
import { useUserHandlers } from "../../hooks/useUserHandlers";
import { roles } from "../../constants/roles";
import { userColumn } from "../../constants/tableColumns";
import { Table } from "../common/table/Table";
import { Pagination } from "../common/table/Pagination";
import { Search } from "../common/search/Search";
import CreateUser from "./CreateUser";
import CreateRole from "./CreateRole";

interface RoleProp {
    role_id: number
    role: string
}

export default function Users() {
    const { 
        count, 
        currentPage, 
        setCurrentPage, 
        rowsPerPage, 
        setRowsPerPage, 
        query, 
        setRoleData, 
        showRole, 
        showModal 
    } = useUser()

    const { role } = useAuth() 
    const { getUser, getRoles } = useUserAPI()

    const { 
        handleChange,
        handleSearch,
        onKeyDown,
        toggleModal,
        toggleRoleModal,
        rowData
    } = useUserHandlers()

    useEffect(() => {
        if(role === roles.ADMIN){
            getRoles().then((data: RoleProp[]) => {
                setRoleData(data.map((item) => item.role))
            }).catch((error) => {
                console.error("Error fetching roles:", error)
            })
        }
    }, [])

    useEffect(() => {
        if(role === roles.ADMIN){
            getUser({ pageNumber: currentPage, pageSize: rowsPerPage })
        }
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
                        placeholder="Search by Email or Role..."
                        />
                </div>
                    {
                        (role === roles.ADMIN) 
                        && 
                        <div>
                            <button 
                                className='add-btn'
                                onClick={toggleRoleModal}
                            >
                                + Add Role
                            </button>
                            <button 
                                className='add-btn'
                                onClick={toggleModal}
                            >
                                + Add User
                            </button>
                        </div>
                    }
            </div>

            <div>
                <div className={rowsPerPage > 10 ? 'table-container' : ''}>
                    <Table
                        columnData={userColumn}
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
            {showModal && <CreateUser /> }
            {showRole && <CreateRole /> }
        </div>
    )
}
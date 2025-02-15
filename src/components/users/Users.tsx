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
import CreateRole from "./CreateRole";
import Actions from "../actions/Actions";

interface RoleProp {
    role_id: number
    role: string
}

export default function Users() {
    const [showModal, setShowModal] = useState(false)
    const [showRole, setShowRole] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [rowId, setRowId] = useState(0)

    const { userData, count, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage, query, setQuery, setFormData, setRoleData } = useUser()
    const { role } = useAuth() 
    const { getUser, getRoles } = useUserAPI()

    useEffect(() => {
        getRoles().then((data: RoleProp[]) => {
            setRoleData(data.map((item) => item.role))
        }).catch((error) => {
            console.error("Error fetching roles:", error)
        })
    }, [])

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

        const user = userData.find(user => user.user_id === id)
        if(!user){
            console.log("user not found")
            return 
        }

        setFormData((prev) => ({
            ...prev,
            email: user.email,
            role: user?.role?.role ?? '-',
        }))
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

    const toggleRoleModal = () => {
        setShowRole(!showRole)
    }

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

            <div className='table-container'>
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
                    setIsEdit={setIsEdit}
                />
            }
            {showRole && 
                <CreateRole
                    setShowRole={setShowRole}
                />
            }
        </div>
    )
}
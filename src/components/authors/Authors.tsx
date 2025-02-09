import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Table } from "../common/table/Table";
import { Pagination } from "../common/table/Pagination";
import { useAuthorAPI } from "../../hooks/useAuthorAPI";
import { useAuthor } from "../../hooks/useAuthor";
import { roles } from "../../constants/roles";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Authors.module.css"

interface JwtPayload {
    role: string
}

export default function Authors() {
    const { authorData, count, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage } = useAuthor()
    const navigate = useNavigate()

    const { setRole } = useAuth()
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

    if (!authorData || authorData.length === 0) {
        return <p>No authors available</p>;
    }

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
                    cellData: author.country ?? 'null'
                },
                {
                    cellData: author.author_id
                }
            ]
        }
    })

    return (
        <div className={styles.author_container}>
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
    )
}
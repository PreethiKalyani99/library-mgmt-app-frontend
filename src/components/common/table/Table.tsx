import { ReactNode } from "react"
import { useAuth } from "../../../hooks/useAuth"
import styles from "./Table.module.css"

interface ColumnProp {
    id: number
    title: string
    width?: number
    roles?: string[]
}

interface CellsProp {
    cellData: ReactNode | string
}

interface RowProp {
    id: number
    className?: string
    cells: CellsProp[]
}

interface TableProp {
    columnData: ColumnProp[]
    rowData: RowProp[]
}

export function Table({ columnData, rowData }: TableProp){
    const { role } = useAuth()
    return (
        <table className={styles.table_container}>
            <TableHeader 
                columnData={columnData} 
                role={role}
            /> 
            <TableBody
                rowData={rowData}
                columnData={columnData}
                role={role}
            />
        </table>
    )
}

const TableHeader = ({ columnData, role }: {columnData: ColumnProp[], role: string}) => {
    return (
        <thead>
            <tr>
                {columnData.map((column: ColumnProp) => {
                    if(column.title !== 'Actions' || (column?.roles && column.roles.includes(role))){
                        return <th key={column.id} style={{ width: `${column.width}px` }}>{column.title}</th>
                    }
                    return null
                })}
            </tr>
        </thead>
    )
}

interface TableBodyProp extends TableProp{
    role: string
}

const TableBody = ({ rowData, columnData, role }: TableBodyProp) => {
    if (rowData.length === 0) {
        return (
            <tbody>
                <tr>
                    <td className={styles.empty_table}>No such data</td>
                </tr>
            </tbody>
        )
    }
    return (
        <tbody>
            {rowData.map((row, index) => (
                <tr key={index} className={row.className}>
                    {row.cells.map((cell, cellIndex) => {
                        const column = columnData[cellIndex] 
                        if (column?.roles && !column.roles.includes(role)) {
                            return null
                        }
                        return (
                            <td key={cellIndex} >{cell.cellData}</td>
                        )
                    })}
                </tr>
            ))}
        </tbody>
    )
}
import leftArrow from "../../../assets/icons/left-arrow-black.png"
import rightArrow from "../../../assets/icons/right-arrow-black.png"
import styles from "./Table.module.css"

interface PaginationProp {
    count: number
    currentPage: number
    setCurrentPage: (page: number) => void
    rowsPerPage: number
    setRowsPerPage: (page: number) => void
}

export function Pagination({ count, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage }: PaginationProp) {
    const isPreviousDisabled = currentPage === 1

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const handleRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value))
        setCurrentPage(1)
    }

    const getPaginationRange = () => {
        const start = (currentPage - 1) * rowsPerPage + 1
        const end = Math.min(currentPage * rowsPerPage, count)
        return `${start}-${end} of ${count}`
    }

    return (
        <TablePagination
            onPageChange={handlePageChange}
            getPaginationRange={getPaginationRange}
            onPerPageChange={handleRowsPerPage}
            rowsPerPage={rowsPerPage}
            isPreviousDisabled={isPreviousDisabled}
            currentPage={currentPage}
            isNextDisabled={Math.min(currentPage * rowsPerPage, count) === count}
        />
    )
}

interface TablePaginationProp {
    onPageChange: (pageNumber: number) => void
    getPaginationRange: () => string
    onPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    rowsPerPage: number
    isPreviousDisabled: boolean
    isNextDisabled: boolean
    currentPage: number
}

function TablePagination({
    onPageChange,
    getPaginationRange,
    onPerPageChange,
    rowsPerPage,
    isPreviousDisabled = false,
    isNextDisabled = false,
    currentPage
}: TablePaginationProp) {
    
    return (
        <div className={styles.range_container}>
            <PerPage onChange={onPerPageChange} value={rowsPerPage} />
            {getPaginationRange()}
            <div className={styles.container}>
                <IconButton
                    icon={leftArrow}
                    alt="previous page"
                    onPageChange={() => onPageChange(currentPage - 1)}
                    disabled={isPreviousDisabled}
                    className={isPreviousDisabled ? `${styles.page_icon} ${styles.disabled}` : styles.page_icon}
                />
                {currentPage}
                <IconButton
                    icon={rightArrow}
                    alt="next page"
                    onPageChange={() => onPageChange(currentPage + 1)}
                    disabled={isNextDisabled}
                    className={isNextDisabled ? `${styles.page_icon} ${styles.disabled}` : styles.page_icon}
                />
            </div>
        </div>
    )
}

interface PerPageProp {
    value: number
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

function PerPage({ value, onChange }: PerPageProp) {
    return (
        <div className={styles.per_page}>
            <span>Rows per page:</span>
            <select onChange={onChange} value={value} className={styles.select}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    )
}

interface IconButtonProp {
    icon: string
    alt: string
    onPageChange: () => void
    disabled: boolean
    className: string
}

function IconButton({ icon, alt, onPageChange, disabled = false, className = "" }: IconButtonProp) {
    return (
        <button
            className={className}
            onClick={onPageChange}
            disabled={disabled}
        >
            <img
                src={icon}
                alt={alt}
                className={styles.arrow}
            />
        </button>
    )
}

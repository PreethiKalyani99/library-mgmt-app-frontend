import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CreateAuthor from "../authors/CreateAuthor"
import CreateBook from "../books/CreateBook"
import { useAuthorAPI } from "../../hooks/useAuthorAPI"
import { useAuth } from "../../hooks/useAuth"
import { roles } from "../../constants/roles"
import { jwtDecode } from "jwt-decode"
import styles from "./Header.module.css"

interface JwtPayload {
    role: string
}

interface HeaderProp {
    onClick: () => void
    showSidebar: boolean
}

const Header = ({ onClick, showSidebar }: HeaderProp) => {
    const [showAuthor, setShowAuthor] = useState(false)
    const [showBook, setShowBook] = useState(false)

    const navigate = useNavigate()

    const { getAuthor } = useAuthorAPI()
    const { logOut, setRole, role } = useAuth()

    const token = localStorage.getItem("token") || ''
 
    useEffect(() => {
        try {
            console.log("Header")
            if(token){
                const userRole = jwtDecode(token) as JwtPayload
                setRole(userRole.role || "")
                getAuthor({})
            }
        } catch (error) {
            console.error("Error decoding token", error)
            navigate("/")
        }
    }, [token])

    const handleAuthor = () => {
        setShowAuthor(!showAuthor)
        setShowBook(false)
    }
    const handleBook = () => {
        setShowBook(!showBook)
        setShowAuthor(false)
    }

    return (
        <div className={styles.header_container}>
            <h1>Welcome!</h1>
            <div>
                <button className={styles.menu_btn} onClick={onClick}>button</button>
                <button onClick={logOut}>Logout</button>
            </div>
        </div>
    )
}

export default Header
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { useAuth } from "../../hooks/useAuth"
import { useUser } from "../../hooks/useUser"
import styles from "./Header.module.css"
import { jwtDecode } from "jwt-decode"

interface HeaderProp {
    onClick: () => void
}

interface JWTpayload {
    user_id: number
    email: string
    role: string
    iat: number
    exp: number
}

const Header = ({ onClick }: HeaderProp) => {
    const [username, setUsername] = useState('')
    const { logOut } = useAuth()
    const { setActiveTab } = useUser()
    const token = Cookies.get('token')
    
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<JWTpayload>(token)
                setCurrentTab(decoded?.role)

                const useremail = decoded?.email
                if (useremail) {
                   const name = useremail.split('@')[0].replace(/[^a-zA-Z]/g, '').trim()
                   setUsername(name)
                }
            } catch (error) {
                console.error('Error decoding token', error)
            }
        }
    }, [token])

    function setCurrentTab(role: string) {
        if (role === 'admin') {
            setActiveTab('user-management')
            return
        }
        setActiveTab('authors')
    }

    return (
        <div className={styles.header_container}>
            <h1>Welcome <span className="capitalize">{username}</span> !</h1>
            <div>
                <button className={styles.menu_btn} onClick={onClick}>button</button>
                <button onClick={logOut} className={styles.logout_btn}>Logout</button>
            </div>
        </div>
    )
}

export default Header
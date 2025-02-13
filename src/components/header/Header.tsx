import { useAuth } from "../../hooks/useAuth"
import styles from "./Header.module.css"

interface HeaderProp {
    onClick: () => void
}

const Header = ({ onClick }: HeaderProp) => {
    const { logOut } = useAuth()

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
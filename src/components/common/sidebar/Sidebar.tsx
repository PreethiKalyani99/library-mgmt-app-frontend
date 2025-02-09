import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import { useData } from "../../../hooks/useData";
import { nav } from "../../../constants/nav";
import Home from "../../home/Home";
import Authors from "../../authors/Authors"
import styles from  './Sidebar.module.css'

interface JwtPayload {
    role: string
}

interface NavProps {
    path: string
    name: string
    roles: string[]
}

interface NavItemProp {
    item: NavProps
}

export default function Sidebar(){
    const [showSidebar, setShowSidebar] = useState(false)
    const token = localStorage.getItem("token") || ''

    if(!token){
        return null
    }

    const userRole = jwtDecode(token) as JwtPayload

    const handleClick = () => {
        setShowSidebar(!showSidebar)
    }

    return (
        <div className={showSidebar ? styles.wrapper_mob : styles.wrapper}>
            <button className={styles.menu_btn} onClick={handleClick}>button</button>
            <div className={showSidebar ? styles.sidebar_container_mob : styles.sidebar_container}>
                {nav.map(item => (
                    item.roles.includes(userRole.role) ?
                    (
                        <div key={item.name} className={styles.sidebar_item}>
                            <NavItem item={item} />
                        </div>
                    )
                    :
                    null
                ))}
            </div>
            <div className={styles.main_container}>
                <Authors/>
            </div>
        </div>
    )
}

function NavItem({ item }: NavItemProp) {
    const navigate = useNavigate()
    const { setActiveTab } = useData()

    const handleClick = (path: string, tabName: string) => {
        setActiveTab(tabName)
        navigate(path)
    }

    return(
        <div onClick={() => handleClick(item.path, item.name)}>
            <div>{item.name}</div>
        </div>
    )
}
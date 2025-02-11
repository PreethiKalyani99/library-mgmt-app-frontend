import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import { useUser } from "../../hooks/useUser";
import { nav } from "../../constants/nav";
import styles from  './Sidebar.module.css'

interface JwtPayload {
    role: string
}

interface NavProps {
    path: string
    name: string
    roles: string[]
    tab: string
}

interface NavItemProp {
    item: NavProps
}

interface SidebarProp {
    showSidebar: boolean 
}

export default function Sidebar({ showSidebar }: SidebarProp){
    const token = localStorage.getItem("token") || ''

    if(!token){
        return null
    }

    const userRole = jwtDecode(token) as JwtPayload

    return (
        <div className={showSidebar ? styles.wrapper_mob : styles.wrapper}>
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
        </div>
    )
}

function NavItem({ item }: NavItemProp) {
    const navigate = useNavigate()
    const { setActiveTab } = useUser()

    const handleClick = (path: string, tabName: string) => {
        setActiveTab(tabName)
        navigate(path)
    }

    return(
        <div onClick={() => handleClick(item.path, item.tab)}>
            <div>{item.name}</div>
        </div>
    )
}
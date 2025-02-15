import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useAuth } from "../../hooks/useAuth";
import { nav } from "../../constants/nav";
import styles from  './Sidebar.module.css'

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
    const { role } = useAuth()
    const { activeTab } = useUser()

    return (
        <div className={showSidebar ? styles.wrapper_mob : styles.wrapper}>
            <div className={showSidebar ? styles.sidebar_container_mob : styles.sidebar_container}>
                {nav.map(item => (
                    item.roles.includes(role) ?
                    (
                        <div key={item.name} className={`${styles.sidebar_item} ${activeTab === item.tab ? styles.active : ''}`}>
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
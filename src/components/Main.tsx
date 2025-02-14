import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";
import { nav } from "../constants/nav";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Authors from "./authors/Authors";
import Books from "./books/Books";
import Users from "./users/Users";
import Borrowers from "./borrowed-books/Borrowers";
import Dashboard from "./dashboard/Dashboard";

interface JwtPayload {
    role: string
    user_id: number 
}

export default function Main(){
    const [showSidebar, setShowSidebar] = useState(false)
    const [userId, setUserId] = useState(0)

    const navigate = useNavigate()
    const location = useLocation()

    const { activeTab, setActiveTab } = useUser()
    const { setRole } = useAuth()

    const token = localStorage.getItem("token") || ''

    useEffect(() => {
        try {
            if (token) {
                const { role: userRole, user_id: user_ID} = jwtDecode(token) as JwtPayload
                setRole(userRole || "")
                setUserId(user_ID)
            }
        } catch (error) {
            console.error("Error decoding token", error)
            navigate("/")
        }
    }, [])

    useEffect(() => {
        const matchPath = nav.find((item: any) => item.path === location.pathname)
        if(matchPath){
            setActiveTab(matchPath.tab)
        }
    }, [location.pathname])

    const handleClick = () => {
        setShowSidebar(!showSidebar)
    }
    
    return (
        <div className="main-container">
            <Row className="row-container">
                <Header
                    onClick={handleClick}
                />
            </Row>
            <Row className="row-container">
                <Col md={4} lg={2} className="col-container">
                    <Sidebar
                        showSidebar={showSidebar}
                    />
                </Col>
                <Col md={8} lg={10} className="content-container">
                    {activeTab === '' && <Dashboard/>}
                    {activeTab === 'authors' && <Authors/>}
                    {activeTab === 'books' && <Books/>}
                    {activeTab === 'user-management' && <Users/>}
                    {activeTab === 'borrowed-books' && <Borrowers userId={userId}/>}
                </Col>
            </Row>
        </div>
    )
}
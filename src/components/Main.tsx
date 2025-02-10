import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useData } from "../hooks/useData";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Authors from "./authors/Authors";
import Books from "./books/Books";

export default function Main(){
    const [showSidebar, setShowSidebar] = useState(false)

    const { activeTab } = useData()

    const handleClick = () => {
        setShowSidebar(!showSidebar)
    }
    
    return (
        <div className="main-container">
            <Row className="row-container">
                <Header
                    onClick={handleClick}
                    showSidebar={showSidebar}
                />
            </Row>
            <Row className="row-container">
                <Col md={4} lg={2} className="col-container">
                    <Sidebar
                        showSidebar={showSidebar}
                    />
                </Col>
                <Col md={8} lg={10} className="content-container">
                    {activeTab === 'authors' && <Authors/>}
                    {activeTab === 'books' && <Books/>}
                </Col>
            </Row>
        </div>
    )
}
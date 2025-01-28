import { ReactNode } from 'react';
import { Card, CardTitle, CardBody } from 'react-bootstrap';
import styles from "./Layout.module.css"

interface LayoutProps {
    title: string
    body: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ title, body }) => {
    return (
        <div className={styles.card_wrapper}>
            <Card className={styles.card_container}>
                <CardTitle>{title}</CardTitle>
                <CardBody>
                   {body}
                </CardBody>
            </Card>
        </div>
    )
}
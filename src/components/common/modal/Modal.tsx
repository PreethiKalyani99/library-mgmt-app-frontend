import { ReactNode } from 'react';
import { Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap';
import styles from "./Modal.module.css"

interface ModalProps {
    title: string
    body: ReactNode
    height?: number
    close?: () => void
}

export const ModalLayout: React.FC<ModalProps> = ({ title, body, height = 100, close }) => {
    return (
        <div className={styles.modal_wrapper} style={{ height: `${height}vh` }}>
            <Modal className={styles.modal_container} onHide={close} show={!!body}>
                <ModalHeader closeButton={!!close}>
                    <ModalTitle>{title}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                   {body}
                </ModalBody>
            </Modal>
        </div>
    )
}
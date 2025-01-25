import success from '../../../assets/icons/success.png'
import error from '../../../assets/icons/error.png'
import styles from './Alert.module.css'

interface AlertProps {
    type: string
    message: string
    onClose: () => void
}

interface DesignAlertProps {
    message: string
    onClose: () => void
    customStyle: React.CSSProperties
    icon: string
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
    switch (type) {
        case "success":
            return (
                <DesignAlert
                    message={message}
                    onClose={onClose}
                    icon={success}
                    customStyle={{
                        color: "#4CAF50",
                        backgroundColor: "#ddffdd",
                        border: "1px solid #4CAF50"
                    }}
                />
            )
        case "error":
            return (
                <DesignAlert
                    message={message}
                    onClose={onClose}
                    icon={error}
                    customStyle={{
                        color: "#f44336",
                        backgroundColor: "#ffdddd",
                        border: "1px solid #f44336"
                    }}
                />
            )
        default:
            return null
    }
}

const DesignAlert: React.FC<DesignAlertProps> = ({ message, onClose, customStyle, icon }) => {
    return (
        <div className={styles.alert_container} style={customStyle}>
            <div className={styles.message_container}>
                <img
                    src={icon}
                    alt={message}
                    className={styles.icon}
                />
                <span className={styles.message}>{message}</span>
            </div>
            {onClose &&
                <button
                    className={styles.close_btn}
                    onClick={onClose}
                    style={{ color: customStyle.color }}
                >
                    &times;
                </button>
            }
        </div>
    )
}
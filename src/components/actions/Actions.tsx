import styles from "./Action.module.css"

interface ActionsProp {
    onEdit?: () => void
    onDelete?: () => void
}

export default function Actions({ onEdit, onDelete }: ActionsProp) {
    return (
        <div className={styles.action_container}>
            {onEdit && <button onClick={onEdit} className={styles.button}>Edit</button>}
            {onDelete && <button onClick={onDelete} className={styles.button}>Delete</button>}
        </div>
    )
}
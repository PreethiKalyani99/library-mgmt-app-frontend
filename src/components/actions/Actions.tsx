interface ActionsProp {
    onEdit?: () => void
    onDelete?: () => void
}

export default function Actions({ onEdit, onDelete }: ActionsProp) {
    return (
        <div>
            {onEdit && <button onClick={onEdit}>Edit</button>}
            {onDelete && <button onClick={onDelete}>Delete</button>}
        </div>
    )
}
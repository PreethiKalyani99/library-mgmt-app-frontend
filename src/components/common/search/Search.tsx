import styles from "./Search.module.css"

interface SearchProps {
    onSearch: () => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    icon?: string
    disabled?: boolean
    onkeydown?: React.KeyboardEventHandler<HTMLInputElement>
    placeholder?: string
}

export function Search({
    onSearch,
    onChange,
    value,
    icon,
    disabled = false,
    onkeydown,
    placeholder = 'Search...'
}: SearchProps) {
    
    return (
        <div className={styles.search_container}>
            <input
                type="search"
                name="search-box"
                id="search-box"
                className={styles.input_box}
                value={value}
                onChange={onChange}
                onKeyDown={onkeydown}
                placeholder={placeholder}
            />
            <button
                className={styles.search_btn}
                onClick={onSearch}
                disabled={disabled}
            >
                {<span className={"search-text"}>Search</span>}
                {icon &&
                    <img
                        src={icon}
                        alt={"search icon"}
                        className={disabled ? `${styles.search_icon} disable-icon` : styles.search_icon}
                    />
                }
            </button>
        </div>
    )
}
import styles from './Loader.module.css'

export const Loader: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loader}></div>
        </div>
    )
}
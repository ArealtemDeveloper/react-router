import styles from './NotFound.module.css'

function NotFound() {
  return (
    <div className={styles.container}>
        <h1 className={styles.error}>
            404
        </h1>

        <p className={styles.label}>
            К сожалению такой страницы не существует
        </p>
    </div>
  )
}

export default NotFound;
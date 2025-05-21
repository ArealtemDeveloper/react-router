import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary"
import SignIn from "../../components/SignIn/SignIn"

import styles from './LoginPage.module.css'

function LoginPage() {
  return (
    <div className={styles.container}>
      <ErrorBoundary>
        <SignIn/>
      </ErrorBoundary>
    </div>
  )
}

export default LoginPage
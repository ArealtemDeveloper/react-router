import SignIn from "../../components/SignIn/SignIn"

import styles from './LoginPage.module.css'

function LoginPage() {
  return (
    <div className={styles.container}>
        <SignIn/>
    </div>
  )
}

export default LoginPage
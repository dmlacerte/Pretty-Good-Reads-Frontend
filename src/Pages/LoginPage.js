import styles from './Login.module.css';

function LoginPage() {
    return (
        <div className={styles.loginPage}>
            <h1 className={styles.title}>Pretty Good Reads</h1>
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <h2 className={styles.signUp}>Sign Up To Start Reading Today!</h2>
                    <button className={styles.signUpButton}>New User Sign Up</button>
                    <br/>
                    <a className={styles.signIn}>Already have an account? Log In</a>
                </div>
                <div className={styles.rightContainer}>
                    <img className={styles.gif} src='https://media1.giphy.com/media/1BWKyYQX2K55GwiUPc/giphy.gif?cid=ecf05e47eiw9b5x072c8bk6ivovo5jj1nb256ju5dn6jr4pr&rid=giphy.gif&ct=g' />
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
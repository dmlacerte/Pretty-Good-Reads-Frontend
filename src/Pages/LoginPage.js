import styles from './Login.module.css';
import { GoogleLogin } from '@react-oauth/google';

function LoginPage(props) {
    const handleLogin = async googleData => {
        // console.log(`token: ${googleData.credential}`)
        const res = await fetch(process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BACK_END_PROD + "/api/v1/auth/google"
        : process.env.REACT_APP_BACK_END_DEV + "/api/v1/auth/google", {
            method: "POST",
            body: JSON.stringify({
            token: googleData.credential
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        
        const data = await res.json();
        props.setUser(data);
        console.log(data);
    }
    
    return (
        <div className={styles.loginPage}>
            <h1 className={styles.title}>Pretty Good Reads</h1>
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <h2 className={styles.signUp}>Log In To Start Reading Today!</h2>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Log in with Google"
                        onSuccess={handleLogin}
                        onFailure={handleLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                    <br/>
                    <a className={styles.signIn}>Sign in above via your Google Account</a>
                </div>
                <div className={styles.rightContainer}>
                    <img className={styles.gif} src='https://media1.giphy.com/media/1BWKyYQX2K55GwiUPc/giphy.gif?cid=ecf05e47eiw9b5x072c8bk6ivovo5jj1nb256ju5dn6jr4pr&rid=giphy.gif&ct=g' />
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
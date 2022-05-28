import styles from './css/Header.module.css';

function MainLayout(props) {
    return (
        <div>
            <a href={process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_FROMT_END_PROD
            : process.env.REACT_APP_FRONT_END_DEV}><h1 className={styles.pageTitle}> Pretty Good Reads</h1></a>
            <div className={styles.accountLink}>
                <a href='/user'>My Account</a>
            </div>
        </div>
    )
}

export default MainLayout;
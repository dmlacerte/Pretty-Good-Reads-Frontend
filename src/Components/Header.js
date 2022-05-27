import styles from './css/Header.module.css';

function MainLayout(props) {
    return (
        <div>
            <h1 className={styles.pageTitle}>Pretty Good Reads</h1>
            <div className={styles.accountLink}>
                <a href='/user'>My Account</a>
            </div>
        </div>
    )
}

export default MainLayout;
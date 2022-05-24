import styles from './Header.module.css';

function MainLayout() {
    return (
        <div>
            <h1 className={styles.pageTitle}>Pretty Good Reads</h1>
            <div className={styles.accountLink}>
                <a href='/'>My Account</a>
            </div>
        </div>
    )
}

export default MainLayout;
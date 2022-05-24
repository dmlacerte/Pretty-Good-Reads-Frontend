import styles from './UserLists.module.css';

function UserLists() {
    return (
        <div>
            <div className={styles.listOptions}>
                <p className={styles.tabOne}>Reading</p>
                <p className={styles.tabTwo}>TBR</p>
                <p className={styles.tabThree}>Past Reads</p>
            </div>
            {/* To add filters, below likely will be a second component */}
            <div className={styles.resultsContainer}>
                <div className={styles.resultContainer}>
                    <h3>Title</h3>
                    <h4>Author</h4>
                </div>
                <div className={styles.resultContainer}>
                    <h3>Title</h3>
                    <h4>Author</h4>
                </div>
            </div>
        </div>
    )
}

export default UserLists;
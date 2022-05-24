import styles from './Search.module.css';

function SearchPage() {
    return (
        <>
            <h2 className={styles.title}>Search Results</h2>
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
        </>
    )
}

export default SearchPage;
import styles from './Search.module.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SearchPage() {
    let { searchFields } = useParams();
    const [bookResults, setBookResults] = useState(null);

    function updateBookResults() {
        //use search params to fetch book results from api 
    }

    useEffect(() => {
        updateBookResults();
    }, []);

    // if (!bookResults) {
    //     return <h1>Loading...</h1>
    // }
    
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
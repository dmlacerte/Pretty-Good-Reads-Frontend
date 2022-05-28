import styles from './css/Search.module.css';
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
const axios = require('axios')

function SearchPage(props) {
    const [bookResults, setBookResults] = useState(null)
    const [index, setIndex] = useState(0)
    const [total, setTotal] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()

    function updateBookResults() {
        axios.get(process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BACK_END_PROD + `/book/search/title/${searchParams.get('title')}/${index}`
        : process.env.REACT_APP_BACK_END_DEV + `/book/search/title/${searchParams.get('title')}/${index}`)
        .then(res => {
            setTotal(res.data.totalItems)
            let books = []
            for (let i = 0; i < res.data.items.length; i++) {
                books.push(res.data.items[i].volumeInfo)
            }
            console.log(books)
            setBookResults(books)
        })
        .catch(console.error)
    }

    useEffect(() => {
        updateBookResults();
    }, [index]);

    // if (!bookResults) {
    //     return <h1>Loading...</h1>
    // }

    if (!bookResults) return <h3>Loading</h3>
    return (
        <>
            <h2 className={styles.title}>Search Results</h2>
            <div className={styles.resultsContainer}>
                {bookResults.map((book, idx) => (
                    <div className={styles.resultContainer} key={idx}>
                        <h3>Title: {book.title}</h3>
                        {book.authors.length === 1 ? <h4>Author: {book.authors[0]}</h4> : <h4>Authors: {book.authors}</h4>}
                    </div>
                ))}
            </div>
            <p>Total Results: {total}</p>
        </>
    )
}

export default SearchPage;
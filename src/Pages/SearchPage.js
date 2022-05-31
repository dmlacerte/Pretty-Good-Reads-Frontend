import styles from './css/Search.module.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
const axios = require('axios')

function SearchPage(props) {
    const [bookResults, setBookResults] = useState(null)
    const [index, setIndex] = useState(0)
    const [total, setTotal] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()

    function updateBookResults() {
        const searchURI = `https://www.googleapis.com/books/v1/volumes?q=`+
        (searchParams.get('title') ? `${searchParams.get('title')}` : ``)+
        (searchParams.get('author') ? `+inauthor:${searchParams.get('author')}` : ``)+
        (searchParams.get('genre') ? `+subject:${searchParams.get('genre')}` : ``)+
        `&startIndex=${index}&printType=books&key=${process.env.REACT_APP_API_KEY}`
        console.log(searchURI)
        axios.get(searchURI)
        .then(res => {
            setTotal(res.data.totalItems)
            // let books = []
            // for (let i = 0; i < res.data.items.length; i++) {
            //     books.push(res.data.items[i].volumeInfo)
            // }
            console.log(res.data.items)
            setBookResults(res.data.items)
        })
        .catch(console.error)
    }

    useEffect(() => {
        updateBookResults();
    }, [index]);
    

    if (!bookResults) return <h3>Loading</h3>

    return (
        <div>
            <div className={styles.resultsContainer}>
                <h2 className={styles.title}>Search Results</h2>
                <div>
                    {bookResults.map((book, idx) => (
                        <Link to={`/book/${book.id}`} key={idx}>
                            <div className={styles.resultContainer}>
                                <p className={styles.bookTitle}>{book.volumeInfo.title}</p>
                                {(!book.volumeInfo.authors) ? null : (book.volumeInfo.authors.length === 1 ? <p className={styles.bookAuthor}><span className={styles.bookDetailCategory}>Author:</span> {book.volumeInfo.authors[0]}</p> : <p className={styles.bookAuthor}><span className={styles.bookDetailCategory}>Authors:</span> {book.volumeInfo.authors.join(', ')}</p>)}
                                <p className={styles.bookDetailDivider}>|</p>
                                <p className={styles.bookPublishedDate}><span className={styles.bookDetailCategory}>Published:</span> {book.volumeInfo.publishedDate} </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.pageButtons}>
                <p>Total Results: {total}</p>
                {(index > 9) ? <button className={styles.button} onClick={() => setIndex(index - 10)}>Previous Page</button> : <button className={styles.button} disabled>Previous Page</button>}
                <button className={styles.button} onClick={() => setIndex(index + 10)}>Next Page</button>
            </div>
        </div>
    )
}

export default SearchPage;
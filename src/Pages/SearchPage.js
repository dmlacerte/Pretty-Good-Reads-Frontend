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
        <>
            <h2 className={styles.title}>Search Results</h2>
            <div className={styles.resultsContainer}>
                {bookResults.map((book, idx) => (
                    <Link to={`/book/${book.id}`}>
                        <div className={styles.resultContainer} key={idx}>
                            <h3>Title: {book.volumeInfo.title}</h3>
                            {book.volumeInfo.authors.length === 1 ? <h4>Author: {book.volumeInfo.authors[0]}</h4> : <h4>Authors: {book.volumeInfo.authors}</h4>}
                        </div>
                    </Link>
                ))}
            </div>
            <p>Total Results: {total}</p>
            {(index > 9) ? <button onClick={() => setIndex(index - 10)}>Previous Page</button> : <button disabled>Previous Page</button>}
            <button onClick={() => setIndex(index + 10)}>Next Page</button>
        </>
    )
}

export default SearchPage;
import styles from './css/View.module.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../Components/Rating';
const axios = require('axios')

function ViewPage({user}) {
    let { id } = useParams();
    const [book, setBook] = useState(null);
    const [bookReviews, setBookReviews] = useState(null);

    function createBook() {
        console.log(`creating`)
        const searchURI = `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.REACT_APP_API_KEY}`
        axios.get(searchURI)
            .then(res => axios.post(process.env.NODE_ENV === 'production'
                ? process.env.REACT_APP_BACK_END_PROD + `/book/post`
                : process.env.REACT_APP_BACK_END_DEV + `/book/post`, res.data))
            .then(res => {
                console.log(res)
                setBook(res.data)
            })
            .catch(console.error)
    }

    function updateBook() {
        //use id to fetch book data from api

        axios.get(process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD + `/book/${id}`
            : process.env.REACT_APP_BACK_END_DEV + `/book/${id}`)
            .then(res => {
                console.log(res)
                if (res.data) setBook(res.data[0])
                else createBook()
            })
            .catch(console.error)
    }

    function updateBookReviews() {
        //use id to fetch book reviews from database
        //universal id we can use b/w api and database?
        if (!book) return

        axios.get(process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD + `/rate/book/${book._id}`
            : process.env.REACT_APP_BACK_END_DEV + `/rate/book/${book._id}`)
            .then(ratings => {
                console.log(ratings)
                setBookReviews(ratings.data)
            })
            .catch(console.error)
    }

    useEffect(() => {
        updateBook()
    }, []);

    //run this when book is updated
    useEffect(() => {
        updateBookReviews()
    }, [book]);

    //should we split reviews into it's own component? 
    if (!book || !bookReviews) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <div className={styles.bookContainer}>
                <div className={styles.bookContentLeft}>
                    <img src={book.volumeInfo.imageLinks.thumbnail} />
                    <form action="#">
                        <select name="bookList" id="bookList">
                            <option value="notRead">Not Read</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="reading">Reading</option>
                            <option value="haveRead">Have Read</option>
                        </select>
                        <input type="submit" value="Update" />
                    </form>
                </div>
                <div className={styles.bookContentRight}>
                    <p className={styles.bookTitle}>{book.volumeInfo.title}</p>
                    <p className={styles.bookAuthor}>{book.volumeInfo.authors.join(', ')}</p>
                    <div className={styles.bookDetails}>
                        <p>{book.volumeInfo.publishedDate}</p>
                        <p>{book.volumeInfo.pageCount} pages</p>
                    </div>
                    <div className={styles.bookDescription}>{book.volumeInfo.description}</div>
                </div>
            </div>
            <div className={styles.reviewsContainer}>
                <h1>Community Ratings</h1>
                <p className={styles.bookRatingUser}>My Rating</p>
                <Rating user={user} book={book}/>
                <div>
                    {bookReviews.map((review, idx) => (
                        <div key={idx}>Rating: {review.score}</div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ViewPage; 
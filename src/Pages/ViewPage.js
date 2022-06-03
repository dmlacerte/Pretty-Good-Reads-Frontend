import styles from './css/View.module.css';
import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../Components/Rating';
import AddToList from '../Components/AddToList';
import RatingList from '../Components/RatingList';
import UserContext from '../UserContext';
import Stars from '../Components/Stars';
const axios = require('axios')

function ViewPage() {
    let { id } = useParams()
    const { book, bookRatings, reRender, setBook, setBookRatings } = useContext(UserContext)
    
    function createBook() {
        const searchURI = `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.REACT_APP_API_KEY}`
        axios.get(searchURI)
            .then(res => axios.post(process.env.NODE_ENV === 'production'
                ? process.env.REACT_APP_BACK_END_PROD + `/book/post`
                : process.env.REACT_APP_BACK_END_DEV + `/book/post`, res.data))
            .then(res => {
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
                if (res.data) setBook(res.data[0])
                else createBook()
            })
            .catch(console.error)
    }

    function updatebookRatings() {
        //use id to fetch book reviews from database
        //universal id we can use b/w api and database?
        if (!book) return

        axios.get(process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD + `/rate/book/${book._id}`
            : process.env.REACT_APP_BACK_END_DEV + `/rate/book/${book._id}`)
            .then(ratings => {
                setBookRatings(ratings.data)
            })
            .catch(console.error)
    }

    useEffect(() => {
        updateBook()
        updatebookRatings()
    }, [reRender]);

    //run this when book is updated
    useEffect(() => {
        updatebookRatings()
    }, [book]);

    if (!book || !bookRatings) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <div className={styles.bookContainer}>
                <div className={styles.bookContentLeft}>
                    <img src={book.volumeInfo.imageLinks.thumbnail} />
                    <AddToList />
                    <div className={styles.myRatingContainer}>
                        <p className={styles.bookRatingUser}>My Rating</p>
                        <Rating />
                    </div>
                </div>
                <div className={styles.bookContentRight}>
                    <p className={styles.bookTitle}>{book.volumeInfo.title}</p>
                    <p className={styles.bookAuthor}>{book.volumeInfo.authors.join(', ')}</p>
                    <div className={styles.bookDetails}>
                        <p>{book.volumeInfo.publishedDate}</p>
                        <p>{book.volumeInfo.pageCount} pages</p>
                    </div>
                    <div className={styles.bookDescription} dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}></div>
                </div>
            </div>
            <div className={styles.reviewsContainer}>
                <div className={styles.reviewsHeader}>
                    <img src='https://icons.iconarchive.com/icons/google/noto-emoji-objects/32/62858-closed-book-icon.png'/>
                    <h1>Community Ratings</h1>
                    <img src='https://icons.iconarchive.com/icons/google/noto-emoji-objects/32/62858-closed-book-icon.png'/>
                    <Stars rating={book.volumeInfo.averageRating ? book.volumeInfo.averageRating : "skip"} bookId={book._id}/>
                </div>
                <div className={styles.reviewsList}>
                    <RatingList />
                </div>
            </div>
        </>
    )
}

export default ViewPage; 
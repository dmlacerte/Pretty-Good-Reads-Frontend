import styles from './View.module.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ViewPage() {
    let { id } = useParams();
    const [book, setBook] = useState(null);
    const [bookReviews, setBookReviews] = useState(null);

    function updateBook() {
        //use id to fetch book data from api
    }

    function updateBookReviews() {
        //use id to fetch book reviews from database
        //universal id we can use b/w api and database?
    }

    useEffect(() => {
        updateBook();
        updateBookReviews();
    }, []);

    //should we split reviews into it's own component? 
    if (!book || !bookReviews) {
        return <h1>Loading...</h1>
    }
     
    return (
        <>
            <div className={styles.bookContainer}>
                <div className={styles.bookContentLeft}>
                    <img src="https://books.google.com/books/content?id=zaRoX10_UsMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70p4aEYWwkEjGAEdHjL0J2NK3sZQO8GN_Lt3End2TA6fTDWXcJ6qljQE4U63px1hz-hIDCaKBWKiKiN8CF8iZYrrtAPdLGGnrqEflQb2zclZW4c5dAvivjNeRt6xUk16TKJpmqb&source=gbs_api" />
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
                    <p className={styles.bookTitle}>Title</p>
                    <p className={styles.bookAuthor}>Author</p>
                    <div className={styles.bookDetails}>
                        <p>Published Date</p>
                        <p>Page Count</p>
                    </div>
                    <p className={styles.bookDescription}>A good book description is a detailed, descriptive copy that is good for public display, used for your book marketing, book discovery, and for sales purposes. It helps potential buyers find and understand your book. It's your pitch. Your chance to get people interested.</p>
                </div>
            </div>
            <div className={styles.reviewsContainer}>
                <h1>Community Ratings</h1>
                <p className={styles.bookRatingUser}>My Rating</p>
                <div>
                    <div>Rating #1</div>
                    <div>Rating #2</div>
                    <div>Rating #3</div>
                </div>
            </div>
        </>
    )
}

export default ViewPage; 
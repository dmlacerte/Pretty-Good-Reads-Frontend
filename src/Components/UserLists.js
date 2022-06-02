import styles from './css/UserLists.module.css';
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function UserLists() {
    const { user, reRender, setReRender } = useContext(UserContext);

    const [displayList, setDisplayList] = useState("reading");
    const [displayListBooks, setDisplayListBooks] = useState(null);

    function updateBooks() {
        // console.log('updating books');
        fetch(process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BACK_END_PROD + `/book/user/${user.googleId}`
        : process.env.REACT_APP_BACK_END_DEV + `/book/user/${user.googleId}`)
            .then(res => res.json())
            .then(res => setDisplayListBooks(res))
            .catch(console.error);
    }

    function updateDisplayList(ev) {
        ev.preventDefault();
        setDisplayList(ev.target.id);
        setReRender(reRender+1);
    }

    useEffect(() => {
        updateBooks();
    }, [reRender]);

    if (!displayListBooks) {
        return <h1>Loading...</h1>
    }
    
    return (
        <div className={styles.listContainer}>
            <div className={styles.listOptions}>
                <p className={displayList === "reading" ? `${`${styles.tabOne} ${styles.selected}`}` : `${styles.tabOne}`}
                    id="reading" onClick={updateDisplayList}>
                    Reading
                </p>
                <p className={displayList === "wishlist" ? `${`${styles.tabTwo} ${styles.selected}`}` : `${styles.tabTwo}`} 
                    id="wishlist" onClick={updateDisplayList}>
                    Wishlist
                </p>
                <p className={displayList === "finished" ? `${`${styles.tabThree} ${styles.selected}`}` : `${styles.tabThree}`}
                    id="finished" onClick={updateDisplayList}>
                    Finished
                </p>
            </div>
            {/* To add filters, below likely will be a second component */}
            <div className={styles.resultsContainer}>
                {displayListBooks[displayList].map((book, index) => {
                    return (
                        <Link to={`/book/${book.id}`} key={index}>
                            <div className={styles.resultContainer} onClick={() => setReRender(reRender+1)}>
                                <div>
                                    <img src= {displayList === "reading" 
                                        ? "https://icons.iconarchive.com/icons/google/noto-emoji-objects/24/62859-open-book-icon.png" 
                                        : "https://icons.iconarchive.com/icons/google/noto-emoji-objects/24/62858-closed-book-icon.png"
                                    }/>
                                </div>
                                <div>
                                    <p className={styles.bookTitle}>{book.volumeInfo.title}</p>
                                    <p className={styles.bookAuthor}>{book.volumeInfo.authors.join(', ')}</p>
                                    {/* {displayList === "finished" ? <Rating/> : null} */}
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default UserLists;

//onClick={() => this.forceUpdate}
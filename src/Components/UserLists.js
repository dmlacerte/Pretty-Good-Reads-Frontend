import styles from './css/UserLists.module.css';
import React, { useState, useEffect } from 'react';

function UserLists(props) {
    const [user, setUser] = useState(null);
    const [displayList, setDisplayList] = useState("reading");
    const [displayListBooks, setDisplayListBooks] = useState(null);

    function updateUser() {
        fetch(`http://localhost:4000/userBooks/${props.user.user.googleId}`)
            .then(res => res.json())
            .then(res => setUser(res))
            .catch(console.error);
    }

    function updateBooks() {
        fetch(`http://localhost:4000/book/user/${props.user.user.googleId}`)
            .then(res => res.json())
            .then(res => setDisplayListBooks(res))
            .catch(console.error);
    }

    function updateDisplayList(ev) {
        ev.preventDefault();
        setDisplayList(ev.target.id);
    }

    useEffect(() => {
        updateUser();
        updateBooks();
    }, []);

    if (!displayListBooks) {
        return <h1>Loading...</h1>
    }
    
    return (
        <div>
            <div className={styles.listOptions}>
                <p className={styles.tabOne} id="reading" onClick={updateDisplayList}>Reading</p>
                <p className={styles.tabTwo} id="wishlist" onClick={updateDisplayList}>TBR</p>
                <p className={styles.tabThree} id="finished" onClick={updateDisplayList}>Past Reads</p>
            </div>
            {/* To add filters, below likely will be a second component */}
            <div className={styles.resultsContainer}>
                {console.log(displayListBooks)}
                {displayListBooks[displayList].map((book, index) => {
                    return (
                        <div key={index} className={styles.resultContainer}>
                            <h3>{book.title}</h3>
                            <h4>{book.authors}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserLists;
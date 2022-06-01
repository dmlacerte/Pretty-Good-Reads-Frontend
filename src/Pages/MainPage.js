import styles from './css/Main.module.css';
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';

function MainPage() {
    const { user } = useContext(UserContext);
    
    const [randomBook, setRandomBook] = useState(null);

    function pickRandomBook() {
        if (user.wishlist.length !== 0) {
            let randomIndex = Math.floor(Math.random() * (user.wishlist.length));
            setRandomBook(user.wishlist[randomIndex].id);
        }
    }

    useEffect(() => {
        pickRandomBook();
    }, [])
    
    return (
        <>
            <div className={styles.container}>
                <h2 className={styles.title}>What Are You Reading Today?</h2>
                <img className={styles.img} src='https://media3.giphy.com/media/JrXc72Pz2Ib1dBK13T/giphy.gif?cid=ecf05e47wg70oq386jw522c5yz919j3tv82zq7tvlxselv2m&rid=giphy.gif&ct=g'/>
                <form action="/search" method="GET">
                    <div className={styles.searchFields}>
                        <input type="text" id="title" name="title" placeholder="Title"/>
                        <input type="text" id="author" name="author" placeholder="Author"/>
                        <input type="text" id="genre" name="genre" placeholder="Genre"/>
                    </div>
                    <button className={styles.button} type="submit" name="submit" value="Search">Search For a New Book</button>
                </form>
                <p className={styles.or}>OR</p>
                <Link to={`/book/${randomBook}`}>
                    <button className={styles.button} type="submit">Select Random from TBR</button>
                </Link>
            </div>
        </>
    )
}

export default MainPage;
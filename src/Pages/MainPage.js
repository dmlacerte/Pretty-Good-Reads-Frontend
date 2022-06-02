import styles from './css/Main.module.css';
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';

function MainPage() {
    const { user } = useContext(UserContext);
    
    const [randomBook, setRandomBook] = useState(null);
    const [formInput, setFormInput] = useState(false);

    function pickRandomBook() {
        if (user.wishlist.length !== 0) {
            let randomIndex = Math.floor(Math.random() * (user.wishlist.length));
            setRandomBook(user.wishlist[randomIndex].id);
        }
    }

    function updateFormInput() {
        setFormInput(true);
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
                        <input onChange={updateFormInput} type="text" id="title" name="title" placeholder="Title"/>
                        <input onChange={updateFormInput} type="text" id="author" name="author" placeholder="Author"/>
                        <select onChange={updateFormInput} id="genre" name="genre">
                            <option value="">Genre (All)</option>
                            <option value="adventure">Adventure</option>
                            <option value="classics">Classics</option>
                            <option value="detective">Detective</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="historical">Historical</option>
                            <option value="horror">Horror</option>
                            <option value="romance">Romance</option>
                            <option value="thriller">Thriller</option>
                        </select>
                        {/* <input onChange={updateFormInput} type="text" id="genre" name="genre" placeholder="Genre"/> */}
                    </div>
                    <button className={styles.button} type="submit" name="submit" value="Search"
                        disabled={formInput ? false : true}>
                        Search For a New Book
                    </button>
                </form>
                <p className={styles.or}>OR</p>
                <Link to={`/book/${randomBook}`}>
                    <button className={styles.button} type="submit" disabled={user.wishlist.length === 0 ? true : false}>Select Random from TBR</button>
                </Link>
                {user.wishlist.length === 0 ? <p className={styles.wishlistMessage}>You don't have any books on your wishlist yet!</p> : null}
            </div>
        </>
    )
}

export default MainPage;
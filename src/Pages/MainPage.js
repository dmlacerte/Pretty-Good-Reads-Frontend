import styles from './css/Main.module.css';
import React, { useState, useEffect } from 'react';

function MainPage(props) {
    //should we fetch # TBR books for user and use that to select an id for select random button?
    
    return (
        <>
            <div className={styles.container}>
                <h2 className={styles.title}>What Are You Reading Today?</h2>
                <form action="/search" method="GET">
                    <div className={styles.searchFields}>
                        <input type="text" id="title" name="title" placeholder="Title"/>
                        <input type="text" id="author" name="author" placeholder="Author"/>
                        <input type="text" id="genre" name="genre" placeholder="Genre"/>
                    </div>
                    <button type="submit" name="submit" value="Search">Search For a New Book</button>
                </form>
                <p className={styles.or}>OR</p>
                <form>
                    <button type="submit">Select Random from TBR</button>
                </form>
            </div>
        </>
    )
}

export default MainPage;
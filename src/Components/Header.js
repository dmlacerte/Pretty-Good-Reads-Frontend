import axios from 'axios';
import styles from './css/Header.module.css';
import React, { useEffect, useContext } from 'react';
import UserContext from '../UserContext';

function Header() {
    const { setAuthenticated, setUser, user } = useContext(UserContext);

    function logOut() {
        // axios.get(process.env.NODE_ENV === 'production'
        //     ? process.env.REACT_APP_BACK_END_PROD + "/user/logout"
        //     : process.env.REACT_APP_BACK_END_DEV + "/user/logout", {
        //     withCredentials: true
        // }).then(response => {
        //     const { authenticated, user } = response.data;
        //     setAuthenticated(authenticated);
        //     setUser(user);
        // })
        localStorage.removeItem('token');
        setAuthenticated(false);
        setUser(null);
    }

    useEffect(() => {
        document.body.style.backgroundColor = 'white';
    }, []);

    return (
        <div className={styles.headerContainer}>
            <a href={process.env.NODE_ENV === 'production'
                ? process.env.REACT_APP_FRONT_END_PROD
                : process.env.REACT_APP_FRONT_END_DEV}><h1 className={styles.pageTitle}> Pretty Good Reads</h1></a>
            <div className={styles.accountLink}>
                <div className={styles.dropdownContainer}>
                    <button className={styles.dropdownButton}>My Account</button>
                    <div className={styles.dropdownOptions}>
                        <a className={styles.myBooks} href="/mybooks">My Books</a>
                        <a onClick={logOut} href="#">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
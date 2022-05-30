import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../UserContext';
import styles from './css/Header.module.css';
import React, { useEffect } from 'react';

function MainLayout(props) {
    const { setAuthenticated, setUser } = useContext(UserContext);

    function logOut() {
        axios.get(process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD + "/user/logout"
            : process.env.REACT_APP_BACK_END_DEV + "/user/logout", {
            withCredentials: true
        }).then(response => {
            const { authenticated, user } = response.data;
            setAuthenticated(authenticated);
            setUser(user);
        })
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
                <button onClick={logOut}>Logout</button>
                {/* <a href='/user'>My Account</a> */}
            </div>
        </div>
    )
}

export default MainLayout;
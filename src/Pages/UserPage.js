import styles from './css/User.module.css';
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';

function UserPage() {
    const { user } = useContext(UserContext);

    return (
        <h1>{user.name}</h1>
    )
}

export default UserPage;
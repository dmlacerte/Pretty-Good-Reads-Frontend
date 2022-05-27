import styles from './css/User.module.css';
import React, { useState, useEffect } from 'react';

function UserPage(props) {
    return (
        <h1>{props.user.user.name}</h1>
    )
}

export default UserPage;
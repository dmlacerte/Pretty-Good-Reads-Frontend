import styles from './css/Rating.module.css'
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import axios from 'axios';

const Rating = () => {
    const { user, book, reRender, setReRender } = useContext(UserContext);
    const [starRating, setStarRating] = useState(null)

    function handleSubmit (idx) {
        setStarRating(idx)
        setReRender(reRender + 1)
    }

    function deleteRating() {
        axios.delete(process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BACK_END_PROD + `/rate/${user._id}/${book._id}`
        : process.env.REACT_APP_BACK_END_DEV + `/rate/${user._id}/${book._id}`)
        .then(() => setStarRating(null))
        .then(() => setReRender(reRender + 1))
        .catch(console.error);
    }

    useEffect(() => {
        axios.get(process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BACK_END_PROD + `/rate/${user._id}/${book._id}`
        : process.env.REACT_APP_BACK_END_DEV + `/rate/${user._id}/${book._id}`)
        .then(res => {
            if(!res.data) setStarRating(null);
            else setStarRating(res.data.score)
        })
    }, [user])

    useEffect(() => {
        if (!starRating) return

        axios.get(process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BACK_END_PROD + `/rate/${user._id}/${book._id}`
        : process.env.REACT_APP_BACK_END_DEV + `/rate/${user._id}/${book._id}`)
        .then(res => {
            // if (res.data.score === starRating) return
            if (res.data) {
                axios.put(process.env.NODE_ENV === 'production'
                ? process.env.REACT_APP_BACK_END_PROD + `/rate/${user._id}/${book._id}/${starRating}`
                : process.env.REACT_APP_BACK_END_DEV + `/rate/${user._id}/${book._id}/${starRating}`)
                .catch(console.error)
            }
            else {
                axios.post(process.env.NODE_ENV === 'production'
                ? process.env.REACT_APP_BACK_END_PROD + `/rate/${user._id}/${book._id}/${starRating}`
                : process.env.REACT_APP_BACK_END_DEV + `/rate/${user._id}/${book._id}/${starRating}`)
                .catch(console.error)
            }
            setReRender(reRender + 1);
        })
        .catch(console.error)
    }, [starRating])

  return (
    <>
        <div className='starRating'>
            {[...Array(5)].map((star, idx) => {
                idx += 1
                return (
                    <span 
                            key ={idx}
                            className={idx <= starRating ? styles.on : styles.off}
                            onClick={() => handleSubmit(idx)}
                        >
                            &#9733;
                    </span>
                )
            })}
        </div> 
        <p className={styles.removeRating} onClick={() => deleteRating()}>Reset Rating</p>
    </> 
  )
}

//took star display format from "https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6"

export default Rating
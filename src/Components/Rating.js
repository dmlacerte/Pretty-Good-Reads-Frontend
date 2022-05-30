import styles from './css/Rating.module.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rating = ({user, book}) => {
    const [starRating, setStarRating] = useState(null)

    useEffect(() => {
        axios.get(process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BACK_END_PROD + `/rate/${user._id}/${book._id}`
        : process.env.REACT_APP_BACK_END_DEV + `/rate/${user._id}/${book._id}`)
        .then(res => {
            if(!res.data) return
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
        })
        .catch(console.error)
    }, [starRating])

  return (
    <div className='starRating'>
        {[...Array(5)].map((star, idx) => {
            idx += 1
            return (
                <span 
                        key ={idx}
                        className={idx <= starRating ? styles.on : styles.off}
                        onClick={() => setStarRating(idx)}
                    >
                        &#9733;
                </span>
            )
        })}
    </div>  
  )
}

//took star display format from "https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6"

export default Rating
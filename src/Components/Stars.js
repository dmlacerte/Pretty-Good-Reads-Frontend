import React, {useEffect, useState, useContext} from 'react'
import styles from './css/Rating.module.css'
import axios from 'axios'
import UserContext from '../UserContext'

const Stars = ({userId, bookId, rating}) => {
    const {reRender} = useContext(UserContext)
    const [starRating, setStarRating] = useState(rating ? rating : null)

    useEffect(() => {
        //if setting community look at all reviews
        //else look at the users review
        if (rating) {
            axios.get(process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD + `/rate/book/${bookId}`
            : process.env.REACT_APP_BACK_END_DEV + `/rate/book/${bookId}`)
            .then(res => {
                if(!res.data) setStarRating(rating);
                else {
                    let sum = res.data.reduce((n, {score}) => n + score, 0)
                    let avg = sum / res.data.length
                    let finalAvg = rating !== "skip" ? (avg + rating) / 2 : avg
                    setStarRating(Math.round(finalAvg))
                }
            })
        } else {
            axios.get(process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD + `/rate/${userId}/${bookId}`
            : process.env.REACT_APP_BACK_END_DEV + `/rate/${userId}/${bookId}`)
            .then(res => {
                if(!res.data) setStarRating(null);
                else setStarRating(res.data.score)
            })
        }
    }, [reRender])

  return (
    <>
    <div className='starRating'>
        {[...Array(5)].map((star, idx) => {
            idx += 1
            return (
                <span 
                        key ={idx}
                        className={idx <= starRating ? styles.on : styles.off}
                    >
                        &#9733;
                </span>
            )
        })}
    </div> 
</> 
  )
}

export default Stars
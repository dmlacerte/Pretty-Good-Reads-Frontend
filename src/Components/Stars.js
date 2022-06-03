import React, { useEffect, useState, useContext } from 'react'
import styles from './css/Stars.module.css'
import axios from 'axios'
import UserContext from '../UserContext'

const Stars = ({ userId, bookId, avg }) => {
    const { reRender, book } = useContext(UserContext)
    const [starRating, setStarRating] = useState(null)

    useEffect(() => {
        if (!avg) {
            axios.get(process.env.NODE_ENV === 'production'
                ? process.env.REACT_APP_BACK_END_PROD + `/rate/${userId}/${bookId}`
                : process.env.REACT_APP_BACK_END_DEV + `/rate/${userId}/${bookId}`)
                .then(res => {
                    if (!res.data) setStarRating(null)
                    else setStarRating(res.data.score)
                })
        }
    }, [reRender])

    //rerender avg rating component when book changes 
    useEffect(() => {
        if (avg) {
            axios.get(process.env.NODE_ENV === 'production'
                ? process.env.REACT_APP_BACK_END_PROD + `/rate/book/${book['_id']}`
                : process.env.REACT_APP_BACK_END_DEV + `/rate/book/${book['_id']}`)
                .then(res => {
                    if (!res.data) setStarRating(null)
                    else {
                        let sum = res.data.reduce((n, { score }) => n + score, 0)
                        let finalAvg = sum / res.data.length
                        setStarRating(Math.round(finalAvg))
                    }
                })
        }
    }, [book, reRender])

    return (
        <>
            <div className={avg ? 'communityRating' : 'stars'}>
                {[...Array(5)].map((star, idx) => {
                    idx += 1
                    return (
                        <span
                            key={idx}
                            className={`${styles.stars} ${idx <= starRating ? styles.on : styles.off}`}
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
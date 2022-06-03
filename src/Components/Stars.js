import React, {useEffect, useState, useContext} from 'react'
import styles from './css/Rating.module.css'
import axios from 'axios'
import UserContext from '../UserContext'

const Stars = ({userId, bookId}) => {
    const {reRender} = useContext(UserContext)
    const [starRating, setStarRating] = useState(null)

    useEffect(() => {
        axios.get(process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BACK_END_PROD + `/rate/${userId}/${bookId}`
        : process.env.REACT_APP_BACK_END_DEV + `/rate/${userId}/${bookId}`)
        .then(res => {
            if(!res.data) setStarRating(null);
            else setStarRating(res.data.score)
        })
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
import React from 'react'
import styles from './css/Rating.module.css'

const RatingList = ({bookRatings}) => {

  return (
      <>
    {bookRatings.map((rating, idx) => (
        <div key={idx}>{rating.user.name} rated it: {[...Array(5)].map((star, idx) => {
            return (
                <span 
                        key={idx}
                        className={idx < rating.score ? styles.on : styles.off}
                    >
                        &#9733;
                </span>
            )
        })}</div>
    ))}
    </>
  )
}

export default RatingList
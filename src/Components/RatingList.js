import React from 'react'
import styles from './css/Rating.module.css'

const RatingList = ({bookRatings}) => {
  
  if (bookRatings.length === 0) {
    return (
        <div>No one has rated this yet!</div>
    )
  } else {
    return (
        <>
      {bookRatings.map((rating, idx) => (
          <div style={{ margin: 5}} key={idx}>{rating.user.name} rated it: {[...Array(5)].map((star, idx) => {
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
}

export default RatingList
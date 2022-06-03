import React, { useContext, useEffect } from 'react'
import UserContext from '../UserContext'
import Stars from './Stars'
import styles from './css/RatingList.module.css'

const RatingList = () => {
    const { bookRatings, book } = useContext(UserContext)

    if (bookRatings.length === 0) {
        return <div>No one has rated this yet!</div>
    } else {
        return (
            <>
                {bookRatings.map((rating, idx) => (
                    <div className={styles.ratingContainer} key={idx}>
                        <div>
                            {rating.user.name} rated it: <Stars userId={rating.user._id} bookId={book._id} />
                        </div>
                        <div className={styles.commentBoxContainer}>
                            <p>{rating.comment}</p>
                        </div>
                    </div>
                ))}
            </>
        )
    }
}

export default RatingList
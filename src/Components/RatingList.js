import React, {useContext} from 'react'
import UserContext from '../UserContext'
import Stars from './Stars'

const RatingList = () => {
  const { bookRatings, book } = useContext(UserContext)
  
  if (bookRatings.length === 0) {
    return (
        <div>No one has rated this yet!</div>
    )
  } else {
    return (
        <>
      {bookRatings.map((rating, idx) => (
          <div style={{ margin: 5}} key={idx}>
            {rating.user.name} rated it: <Stars userId={rating.user._id} bookId={book._id}/>
            </div>
      ))}
      </>
    )
  }
}

export default RatingList
import styles from './css/Rating.module.css'
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import axios from 'axios';

const Rating = () => {
    const { user, book, reRender, setReRender } = useContext(UserContext)
    const [starRating, setStarRating] = useState(null)
    const [comment, setComment] = useState(null)
    const [displayComment, setDisplayComment] = useState(null)
    const [commentBox, setCommentBox] = useState(false)

    function handleSubmit(idx) {
        setStarRating(idx)
        setReRender(reRender + 1)
    }

    function deleteRating() {
        axios.delete(process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD + `/rate/${user._id}/${book._id}`
            : process.env.REACT_APP_BACK_END_DEV + `/rate/${user._id}/${book._id}`)
            .then(() => {
                setStarRating(null)
                setDisplayComment(null)
                setReRender(reRender + 1)
            })
            .catch(console.error);
    }

    function updateComment() {
        axios.put(process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD + `/rate/${user._id}/${book._id}`
            : process.env.REACT_APP_BACK_END_DEV + `/rate/${user._id}/${book._id}`, 
            { comment })
            .then(res => {
                setDisplayComment(res.data.comment)
                setReRender(reRender + 1)
            })
            .then(() => setCommentBox(false))
            .catch(console.error);
    }

    useEffect(() => {
        axios.get(process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD + `/rate/${user._id}/${book._id}`
            : process.env.REACT_APP_BACK_END_DEV + `/rate/${user._id}/${book._id}`)
            .then(res => {
                if (!res.data) setStarRating(null);
                else {
                    setStarRating(res.data.score)
                    setDisplayComment(res.data.comment)
                }
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
                            className={`${styles.stars} ${idx <= starRating ? styles.on : styles.off}`}
                            onClick={() => handleSubmit(idx)}
                        >
                            &#9733;
                        </span>
                    )
                })}
            </div>
            <div>
                <p className={styles.ratingActions} onClick={() => deleteRating()}>Reset Rating</p>
                <p className={styles.ratingActions} onClick={() => setCommentBox(true)}>Add / Edit Comment</p>
            </div>
            <p>{displayComment}</p>
            <input hidden={commentBox ? false : true} type="text" id="comment" name="comment" onChange={(e) => setComment(e.target.value)}></input>
            <button hidden={commentBox ? false : true} disabled={starRating ? false : true} onClick={() => {updateComment()}}>Submit</button>
        </>
    )
}

//took star display format from "https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6"

export default Rating
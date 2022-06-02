import React, {useState, useEffect, useContext} from 'react'
import UserContext from '../UserContext'
import styles from './css/AddToList.module.css'
const axios = require('axios')

const AddToList = () => {
    const { user, book, reRender, setReRender } = useContext(UserContext);
    const [list, setList] = useState(`notRead`)
    const [currentList, setCurrentList] = useState(null);

    function handleChange (element) {
        setList(element.target.value)
    }

    function handleSubmit (element) {
        element.preventDefault()

        let routeURI = process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BACK_END_PROD + `/user/updateList` 
        : process.env.REACT_APP_BACK_END_DEV + `/user/updateList`;

        axios.put(routeURI, {list: list, userId: user._id, bookId: book._id})   
            .then(() => setReRender(reRender + 1))
            .catch(console.error);
    }

    useEffect(() => {
        let currentBook = book['_id'];
        if (user.finished.includes(book['_id'])) {
            setCurrentList("finished");
        } else if (user.reading.includes(book['_id'])) {
            setCurrentList("reading");
        } else if (user.wishlist.some(item => item['_id'] === book['_id'])) {
            setCurrentList("wishlist");
        } else {
            setCurrentList("notRead");
        }
    }, [book]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
        <select className={styles.listOptions} name="bookList" id="bookList" onChange={(e) => handleChange(e)}>
            <option value="notRead" selected={currentList === 'notRead' ? true : false}>Not Read</option>
            <option value="wishlist" selected={currentList === 'wishlist' ? true : false}>Wishlist</option>
            <option value="reading" selected={currentList === 'reading' ? true : false}>Reading</option>
            <option value="finished" selected={currentList === 'finished' ? true : false}>Finished</option>
        </select>
        <input type="submit" value="Update" />
    </form>
  )
}

export default AddToList
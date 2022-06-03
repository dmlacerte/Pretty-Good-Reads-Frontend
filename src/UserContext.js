import { createContext } from "react"

const UserContext = createContext({
    authenticated: false,
    user: null,
    book: null,
    bookRatings: null,
    reRender: 0,
    setAuthenticated: (auth) => {},
    setUser: (user) => {},
    setBook: (book) => {},
    setBookRatings: (bookRatings) => {},
    setReRender: (reRender) => {}
})

export default UserContext
import { createContext } from "react";

const UserContext = createContext({
    authenticated: false,
    user: null,
    book: null,
    bookRatings: null,
    setAuthenticated: (auth) => {},
    setUser: (user) => {},
    setBook: (book) => {},
    setBookRatings: (bookRatings) => {}
})

export default UserContext;
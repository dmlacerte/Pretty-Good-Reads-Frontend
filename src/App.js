import './App.css';
import UserContext from './UserContext.js';
import AuthenticatePage from './Pages/AuthenticatePage';

import React, { useState } from 'react';

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [book, setBook] = useState(null);
  const [bookRatings, setBookRatings] = useState(null);
  const [reRender, setReRender] = useState(0);

  return (
    <UserContext.Provider value={{ 
      authenticated, setAuthenticated,
      user, setUser, 
      book, setBook,
      bookRatings, setBookRatings,
      reRender, setReRender
      }}>
      <AuthenticatePage/>
    </UserContext.Provider>
  );
}

export default App;

import './App.css';
import Header from './Components/Header.js';
import MainPage from './Pages/MainPage.js';
import SearchPage from './Pages/SearchPage.js';
import ViewPage from './Pages/ViewPage.js';
import UserLists from './Components/UserLists.js';
import LoginPage from './Pages/LoginPage.js';
import UserContext from './UserContext.js';

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_BACK_END_PROD + "/user/me"
      : process.env.REACT_APP_BACK_END_DEV + "/user/me", {
      withCredentials: true
    }).then(response => {
      const {authenticated, user} = response.data;
      setAuthenticated(authenticated);
      setUser(user);
    })
  }, [])

  return (
    <UserContext.Provider value={{ authenticated, setAuthenticated, user, setUser }}>
      {authenticated 
      ? <div>
        <header className='headerLayout'>
          <Header user={user} />
        </header>
        <main>
          <div className='bodyContainerLayout'>
            <div className='bodyContentLayout'>
              <Routes>
                <Route path='/' element={<MainPage user={user} />} />
                <Route path='/search' element={<SearchPage user={user} />} />
                <Route path='/book/:id' element={<ViewPage user={user} />} />
              </Routes>
            </div>
            <div className='userListsLayout'>
              <UserLists />
            </div>
          </div>
        </main>
      </div> 
      : <div>
        <LoginPage />
      </div>}
    </UserContext.Provider>
  );
}

export default App;

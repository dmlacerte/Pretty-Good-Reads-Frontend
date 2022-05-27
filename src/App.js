import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Components/Header.js';
import MainPage from './Pages/MainPage.js';
import SearchPage from './Pages/SearchPage.js';
import ViewPage from './Pages/ViewPage.js';
import UserLists from './Components/UserLists.js';
import LoginPage from './Pages/LoginPage.js';
import UserPage from './Pages/UserPage.js';
import { Routes, Route } from 'react-router-dom';

function App() {

  const [user, setUser] = useState(null);

  if (!user) {
    return (
      <div>
        <LoginPage user={user} setUser={setUser} />
      </div>
    )
  } else {
    return (
      <div>
        <header className='headerLayout'>
          <Header user={user}/>
        </header>
        <main>
          <div className='bodyContainerLayout'>
            <div className='bodyContentLayout'>
              <Routes>
                  <Route path='/' element={<MainPage user={user}/>}/> 
                  <Route path='/user' element={<UserPage user={user}/>}/>
                  <Route path='/search' element={<SearchPage user={user}/>} />
                  <Route path='/search/:id' element={<ViewPage user={user}/>} />
              </Routes>
            </div>
            <div className='userListsLayout'>
              <UserLists user={user}/>
            </div>
          </div>
        </main>
      </div>
    );
    }
}

export default App;

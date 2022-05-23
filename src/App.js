import './App.css';
import React from 'react';
import Header from './Components/Header.js';
import MainPage from './Pages/MainPage.js';
import SearchPage from './Pages/SearchPage.js';
import ViewPage from './Pages/ViewPage.js';
import UserLists from './Components/UserLists.js'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <main>
        <Header />
        <Routes>
            <Route path='/' element={<MainPage />}/> 
            <Route path='/search' element={<SearchPage />} />
            <Route path='/search/:id' element={<ViewPage />} />
        </Routes>
        <UserLists />
      </main>
    </>
  );
}

export default App;

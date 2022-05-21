import './App.css';
import React from 'react';
import MainPage from './Components/MainPage.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<MainPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

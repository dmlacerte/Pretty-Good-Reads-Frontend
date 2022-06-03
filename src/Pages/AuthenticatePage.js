import '../App.css'
import Header from '../Components/Header.js'
import MainPage from './MainPage.js'
import SearchPage from './SearchPage.js'
import ViewPage from './ViewPage.js'
import UserLists from '../Components/UserLists.js'
import LoginPage from './LoginPage.js'
import UserContext from '../UserContext.js'

import React, { useEffect, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

function AuthenticatePage() {
    const { authenticated, reRender, setAuthenticated, setUser } = useContext(UserContext)

    useEffect(() => {
        axios.get(process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD + "/user/me"
            : process.env.REACT_APP_BACK_END_DEV + "/user/me",
            {
                withCredentials: true,
                headers: { token: JSON.parse(localStorage.getItem('token')) }
            }).then(response => {
                const { authenticated, user } = response.data
                setAuthenticated(authenticated)
                setUser(user)
            })
    }, [reRender])

    return (
        <>
            {authenticated
                ?
                <div>
                    <header className='headerLayout'>
                        <Header />
                    </header>
                    <main>
                        <div className='bodyContainerLayout'>
                            <div className='bodyContentLayout'>
                                <Routes>
                                    <Route path='/' element={<MainPage />} />
                                    <Route path='/mybooks' element={<UserLists />} />
                                    <Route path='/search' element={<SearchPage />} />
                                    <Route path='/book/:id' element={<ViewPage />} />
                                </Routes>
                            </div>
                            <div className='userListsLayout'>
                                <UserLists />
                            </div>
                        </div>
                    </main>
                </div>
                :
                <div>
                    <LoginPage />
                </div>
            }
        </>
    )
}

export default AuthenticatePage

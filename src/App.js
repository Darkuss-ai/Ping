import React from 'react';
import Login_page from "./pages/Login";
import Main_page from "./pages/Main";

import AppStore from "./store/appStore"
import './css/style.css'

import {observer} from "mobx-react-lite";
import {Route, Routes, Navigate} from 'react-router-dom';
import { useCookies, CookiesProvider } from 'react-cookie';

const App = observer( () =>
{
    const [cookies] = useCookies(["ping"]);

    // if(cookies.ping !== undefined)
    //     AppStore.Auth(cookies.ping)

    return (
    <CookiesProvider>
        <Routes>
            <Route path = '/' 
            element={AppStore.loginStatus === 'notAuth'? <Login_page/>: <Navigate to='/id' />} 
            />
            <Route path = '/id'
            element={AppStore.loginStatus === 'auth' ? <Main_page/>: <Navigate to='/' />}
            />
            <Route path = "*" 
            element={AppStore.loginStatus === 'auth' ? <Navigate to='/id' />: <Navigate to='/' />}
            />
        </Routes>
    </CookiesProvider>
    )
})

export default App
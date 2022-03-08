import React from 'react';
import Login_page from "./pages/Login";
import Main_page from "./pages/Main";

import Login from "./store/login"
import './css/style.css'

import {observer} from "mobx-react-lite";
import {Route, Routes, Navigate} from 'react-router-dom';
import { useCookies, CookiesProvider } from 'react-cookie';

const App = observer( () =>
{
    const [cookies] = useCookies(["ping"]);

    if(cookies.ping !== undefined)
        Login.Auth(cookies.ping)

    return (
    <CookiesProvider>
        <Routes>
            <Route path = '/'   element={!Login.status? <Login_page/>: <Navigate to='/id' />} />
            <Route path = '/id' element={Login.status? <Main_page/>: <Navigate to='/' />}/>
            <Route path = "*"   element={Login.status? <Navigate to='/id' />: <Navigate to='/' />}/>
        </Routes>
    </CookiesProvider>
    )
})

export default App
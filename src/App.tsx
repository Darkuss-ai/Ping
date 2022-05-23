import React from 'react';
import Login_page from "./pages/Login";
import Main_page from "./pages/Main";
import Forgot_page from './pages/Forgot';

import { store } from './store/store';
import './css/static/style.css'

import { observer } from "mobx-react-lite";
import { Route, Routes, Navigate } from 'react-router-dom';
import { useCookies, CookiesProvider } from 'react-cookie';

const App = observer(() =>
{
    const [cookies] = useCookies(["ping"]);

    // if(cookies.ping !== undefined)
    //     AppStore.Auth(cookies.ping)
    return (
    <CookiesProvider>
        <Routes>
            <Route path = '/' 
            element={store.appStore.loginStatus === 'auth' ? <Navigate to='/id' />: <Login_page/>} 
            />
            <Route path = '/id'
            element={store.appStore.loginStatus === 'auth' ? <Main_page/>: <Navigate to= '/'/>}
            />
            <Route path = '/forgot' element = {<Forgot_page/>}
            />
            <Route path = "*" 
            element={store.appStore.loginStatus === 'auth' ? <Navigate to='/id' />: <Navigate to='/' />}
            />
        </Routes>
    </CookiesProvider>
    )
})

export default App
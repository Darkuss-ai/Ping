import React from "react";

import {useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

import  Login from '../store/login'

import {Logo} from '../components/logo';
import {Forms} from "../components/forms";
import {Footer} from "../components/footer";


const Login_page = () =>
{
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['ping']);


    const onSubmit = (data) =>
    {
        const status = 'OK'
        if(status === 'OK')
        {
            Login.Auth(data.login)
            setCookie('ping', data.login, {path: '/'})
            navigate('/id')
        }
    }


    return(
        <div id='ping_login'>
            <header>
                <Logo/>
            </header>

            <main>
                <Forms onSubmit = {onSubmit} />
            </main>

            <Footer/>
        </div>
    )
}

export default Login_page
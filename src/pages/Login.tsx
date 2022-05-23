import React from "react";
import { Logo } from '../components/login/logo';
import { Forms } from "../components/login/forms";
import { Footer } from "../components/login/footer";
import { Error } from "../components/general/error";

const Login_page = () =>
{
    return(
        <div id='ping_login'>
            <header>
                <Logo/>
            </header>

            <main>
                <Forms/>
            </main>

            <Footer/>
            <Error/>
        </div>
    )
}

export default Login_page
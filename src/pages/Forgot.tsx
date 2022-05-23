import React from "react";
import { Forms } from "../components/forgot/form";
import { Footer } from "../components/login/footer";
import { Error } from "../components/general/error";
const Forgot_page = () =>
{
    return(
        <div id='ping_login'>
            <header>
                {/* <Logo/> */}
                <h2>Reset your password</h2>
            </header>

            <main>
                <Forms/>
            </main>

            <Footer/>
            <Error/>
        </div>
    )
}

export default Forgot_page
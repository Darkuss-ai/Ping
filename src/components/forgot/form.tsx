import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {GoogleReCaptchaProvider, useGoogleReCaptcha} from 'react-google-recaptcha-v3'


const URL = process.env.REACT_APP_SITE_KEY

export const Forms = () =>
{
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [send, setSend] = useState<boolean>(true);
    const navigate = useNavigate();
    
    const onSubmit: (email: any) => void =(email: any) =>
    {
        
    }
    return(
        <GoogleReCaptchaProvider reCaptchaKey={URL}>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {
                send && <div>
                    <p>
                    Check your email for a link to reset your password. 
                    If it doesn’t appear within a few minutes, check your spam folder.
                    </p>
                    <button className="register_button" type='submit' 
                    onClick={() => navigate('/')}>Back to login</button>
                </div>
            }
            {
                !send && <div>
                    <input {...register('email')} placeholder="Email"/>
                    <button className="register_button" type='submit'>Send to Email</button>
                </div>
                
            }
        </form>
        </GoogleReCaptchaProvider>

    )
}


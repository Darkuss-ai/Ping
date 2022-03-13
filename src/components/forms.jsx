import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { wsLogIn, wsRegistration } from "../ws/messageSender";
import '../css/forms.css'

export const Forms = (props) =>
{
    const [forms, setForms] = useState('login')
    const [passwordShown, setPasswordShown] = useState('password');


    const updateForm = (state) =>
    {
        setForms(state);
        setPasswordShown('password');
    }

    const togglePasswordVisiblity = () => setPasswordShown(passwordShown === 'password'? 'text': 'password');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) =>
    {
        if(forms === 'login')
            wsLogIn(data.login, data.password)
        if(forms === 'signup')
        wsRegistration(data.login, data.email, data.password1)
    }
    return(
        <form className='login' onSubmit={handleSubmit(onSubmit)}>

            <div className='row'>
                <p className={'form' + (forms === 'login'? " selected":'')}
                   onClick={() => updateForm('login')}>Log In</p>
                <p className={'form' + (forms === 'signup'? " selected":'')}
                   onClick={() => updateForm('signup')}>Sign Up</p>
            </div>

            {
                forms === "login" && <div>
                    <div className='form_elem'>
                        <input {...register('login')} placeholder="Login"/>
                    </div>

                    <div className='form_elem'>
                        <input {...register('password')} placeholder="Password" type={passwordShown}/>

                        <FontAwesomeIcon onClick={togglePasswordVisiblity} className='icon'
                                         icon={passwordShown === 'password'? faEye: faEyeSlash}/>


                    </div>

                    <p className="forgot"><a  className='forgot' href="#">Forgot Password?</a></p>
                    <button className="register_button" type='submit'>Login</button>
                </div>
            }
            {
                forms === "signup" && <div>
                    <div className='form_elem'>
                        <input {...register('login')} placeholder="Login"/>
                    </div>
                    <div className='form_elem'>
                        <input {...register('email')} placeholder="Email"/>
                    </div>
                    <div className='form_elem'>
                        <input {...register('password1')} placeholder="Password" type={passwordShown}/>
                        <FontAwesomeIcon onClick={togglePasswordVisiblity} className='icon'
                                         icon={passwordShown === 'password'? faEye: faEyeSlash}/>
                    </div>
                    <div className='form_elem'>
                        <input {...register('password2')} placeholder="Repeat password"
                               type={passwordShown}/>
                        <FontAwesomeIcon onClick={togglePasswordVisiblity} className='icon'
                                         icon={passwordShown === 'password'? faEye: faEyeSlash}/>
                    </div>

                    <button className="register_button" type='submit'>Signup</button>
                </div>
            }
        </form>
    )
}
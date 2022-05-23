import React, {useState} from "react";
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
//import { wsLogIn, wsRegistration } from "../ws/messageSender";
import '../../css/pages/forms.css'
import { store } from "../../store/store";

export const Forms = () =>
{
    // форма логина или пароля
    const [forms , setForms] = useState<string>('login')
    // отображение пароля
    const [passwordShown, setPasswordShown] = useState<string>('password');
    // хук форм
    const { register, handleSubmit, formState: { errors } } = useForm();
    // хук навигации
    const navigate = useNavigate();


    const updateForm: (state: string) => void = 
        (state: string) => { setForms(state); setPasswordShown('password'); }

    const togglePasswordVisiblity: () => void = 
        () => setPasswordShown(passwordShown === 'password'? 'text': 'password');

    type login = {login: string, pasword: string}
    const onSubmit: (data: any) => void = (data: any) =>
    {
        store.appStore.error_add = true;
        store.appStore.push_error("sadfasdfasssssssssssssssssssssssssssssssssssssssssssssssssssadfsadfasdafdsfasdfasdfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(data)
        if(forms === 'login')
            console.log()
            //wsLogIn(data.login, data.password)
        if(forms === 'signup')
            console.log()
        //wsRegistration(data.login, data.email, data.password1)
    }
    
    return(
        <form className='login' onSubmit={handleSubmit(onSubmit)}>
            {/*SELECT LOGIN OR REGISTRATION FORM */}
            <div className='row'>
                <p className={'form' + (forms === 'login'? " selected":'')}
                   onClick={() => updateForm('login')}>Log In</p>
                <p className={'form' + (forms === 'signup'? " selected":'')}
                   onClick={() => updateForm('signup')}>Sign Up</p>
            </div>

            {/*LOGIN*/}
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
                    {/* FORGOT PASSWORD*/}
                    <p className="forgot" onClick={() => navigate('/forgot')}>Forgot Password?</p>
                    
                    <button className="register_button" type='submit'>Login</button>
                </div>
            }
            {/*REGISTRATION*/}
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
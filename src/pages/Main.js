import React from 'react';
import {observer} from "mobx-react-lite";
import { useCookies} from 'react-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faUser, faUsers, faHouse} from '@fortawesome/free-solid-svg-icons'
import '../css/main.css'
import Login from '../store/login'
const Main_page = () =>
{
    return <div>
        <main>
            <div>

            </div>
            <div>
                <input/>
                <FontAwesomeIcon icon={faShare}/>
            </div>
        </main>
        <footer className='main_footer'>
            <div className='info'>
                <div className='avatar'>
                    <FontAwesomeIcon style={{

                    }} icon={faUser}/>
                </div>

                <div className='bio'>
                    <p id='Nickname'>{Login.login}</p>
                    <p id='status'>Love yourself</p>
                </div>
            </div>
            <div className='navigation'>
                <FontAwesomeIcon icon={faUser} />
                <FontAwesomeIcon icon={faHouse} />
                <FontAwesomeIcon icon={faUsers} />
            </div>
        </footer>
    </div>
}

export default Main_page
import React from 'react';
import {observer} from "mobx-react-lite";
import { useCookies} from 'react-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faUser, faUsers, faHouse, faMessage, faCog, faSignOutAlt} 
from '@fortawesome/free-solid-svg-icons'
import '../css/main.css'
import Login from '../store/appStore'
const Main_page = () =>
{
    return <div>
        <main>
            <div>

            </div>
            {/* <div>
                <input/>
                <FontAwesomeIcon icon={faShare}/>
            </div> */}
        </main>
        <nav className='main_nav'>
            <button className='menu_button' data>
                <FontAwesomeIcon icon={faHouse} />
                <span className='right' >Домашняя страница</span>
            </button>
            <button className='menu_button'>
                <FontAwesomeIcon icon={faUsers} />
                <span className='right' >Сообщества</span>
            </button>
            <button className='menu_button'>
                <FontAwesomeIcon icon={ faMessage} />
                <span className='right' >Личные сообщения</span>
            </button>
            <button className='menu_button'>
                <FontAwesomeIcon icon={faUser} />
                <span className='right' >Друзья</span>
            </button>
        </nav>
        
        <section className='options'>
            <button className='menu_button'>
                <FontAwesomeIcon icon={ faCog} />
                <span className='top'>Настройки</span>
            </button>
            <button className='menu_button'>
                <FontAwesomeIcon icon={ faSignOutAlt} />
                <span className='top'>Выход</span>
            </button>
        </section>

        <footer className='main_footer'>
            <div className='info'>
                <button className='avatar'>
                    <img src='./media/discord.jpeg'></img>
                </button>

                <div className='bio'>
                    <p id='Nickname'>{Login.login}</p>
                    <p id='Status'>Love yourself</p>
                </div>
            </div>
        </footer>
    </div>
}

export default Main_page
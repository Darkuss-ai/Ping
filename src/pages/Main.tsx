import React from 'react';
import {observer} from "mobx-react-lite";
import { useCookies} from 'react-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faUser, faUsers, faHouse, faMessage, faCog, faSignOutAlt} 
from '@fortawesome/free-solid-svg-icons'
import '../css/pages/main.css'
import { store } from '../store/store';
const Main_page = observer( () =>
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
            <button className='menu_button'>
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
                    {/* {console.log(store.appStore.profile['status'])}
                    <p id='Nickname'>{store.appStore.profile['username']}</p>
                    <p id='Status'>{store.appStore.profile['status']}</p> */}
                </div>
            </div>
        </footer>
    </div>
}
) 

export default Main_page
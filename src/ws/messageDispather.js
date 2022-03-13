import { faCaretSquareDown } from "@fortawesome/free-solid-svg-icons";
import appStore from "../store/appStore";
import localStore from "../store/localStore";

import {wsGetProfile} from './messageSender';

const dispatchMessage = res =>
{
    console.log(res)
    switch(res.action) {
        case 'login':
        case 'login:auto':
            if(res.status === 'success')
            {
                appStore.SetLoginStatus('auth')
                localStore.SetToken(res.token)
                if(!Object.keys(appStore.profile).length)
                   wsGetProfile()
            }
            else if(res.status === 'error')
            {
                if(res.error.detail === 'bad data')
                    appStore.SetLoginStatus('credentError')

                if(res.error.detail === 'bad token')
                    appStore.SetLoginStatus('tokenOutdate')
            } 
            break;
        
        case 'profile':
            if(res.status === 'success')
            {
                appStore.SetProfile(res['data'])
                console.log('lol')
            }

            
    }
}

export default dispatchMessage
export {}
// import { faCaretSquareDown } from "@fortawesome/free-solid-svg-icons";
// import { store } from "../store/store";

// import {wsGetProfile} from './messageSender';

// const dispatchMessage = res =>
// {
//     console.log(res)
//     switch(res.action) {
//         case 'login':
//         case 'login:auto':
//             if(res.status === 'success')
//             {
//                 store.appStore.SetLoginStatus('auth')
//                 store.localStore.SetToken(res.token)
//                 if(!Object.keys(store.appStore.profile).length)
//                    wsGetProfile()
//             }
//             else if(res.status === 'error')
//             {
//                 if(res.error_detail === 'bad data')
//                     store.appStore.SetLoginStatus('credentError')

//                 if(res.error_detail === 'bad token')
//                     store. appStore.SetLoginStatus('tokenOutdate')

//                     console.log(appStore.loginStatus)
//             } 
//             break;
        
//         case 'profile':
            
//             if(res.status === 'success')
//             {
                
//                 appStore.SetProfile(res['data'])
//                 console.log('lol')
//             }
//             else console.log(console.log(res))

            
//     }
// }

// export default dispatchMessage
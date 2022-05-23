import axios, { AxiosResponse } from "axios";
import { store } from '../store/store';

axios.defaults.baseURL = 'http://80.87.198.2/'; //заменить на env

const responseBody = (responce: AxiosResponse) => responce.data;

axios.interceptors.request.use(config => {
    const token = store.localStore.token;
    if (token && config.headers !== undefined) 
        config.headers.Authorization = `Bearer ${token}`
    return config;
})

// export const authAPI = 
// {
//     me() => {return instan}
// }
// const API = () =>
// {
//     //post registration
//     URL.post('registration/').then(res =>{ 
//         if(res.status == 'OK')
//         {
//             store.localStore.SetToken(res.acces_token);
//             store.localStore.SetRefreshToken(res.refresh_token);
//             store.appStore.SetLoginStatus(res.auth);
//         }
//         else{
//             console.log(res.error_detail)
//         }
//     })
//     .catch(console.log('server registration error'))

//     //post login
//     URL.post('login/').then(res =>{ 
//         if(res.status == 'OK')
//         {
//             store.localStore.SetToken(res.acces_token);
//             store.localStore.SetRefreshToken(res.refresh_token);
//             store.appStore.SetLoginStatus(res.auth);
//         }
//         else{
//             console.log(res.error_detail)
//         }
//     })
//     .catch(console.log('server login error'))
// }

//export default API

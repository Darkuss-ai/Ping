export {}
// import {wsLogInAuto} from './messageSender'
// import dispatchMessage from './messageDispather'

// import { store } from '../store/store'

// const urlLocale = 'http://localhost:5000/'
// const wsLocale = 'ws://localhost:5000'
// const wsServer = 'ws://80.87.198.2:8888'
// const  wsStart:(url:string) => void = wsURL =>
// {
//     store.appStore.SetWsStatus('connecting')
//     const ws = new WebSocket(wsURL)
//     //коннект
//     ws.onopen = _ =>
//     {
//         console.log('yes!!!')
//         if(store.localStore.token !== '')
//         {
//             wsLogInAuto()
//         }
//         store.appStore.SetWsStatus('connected');
//     }

//     //чекаем ошибочки
//     ws.onerror = e => console.log('error: ' + e.message)

//     //реконнект
//     ws.onclose = _ =>
//     {
//         appStore.SetWsStatus('disconnected')
//         setTimeout(_ => wsStart(wsURL), 3000)
//     }

//     ws.onmessage = e =>
//     {
//         dispatchMessage(JSON.parse(e.data))
//     }
    
//     window.viWSSend = data =>
//     {
//         console.log(data)
//         if(ws.readyState === 1)
//         {
//             const res = JSON.stringify(data)
//             ws.send(res)
//         }
//     }
// }

// wsStart(wsServer)
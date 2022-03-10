// import * from './messsageSender'
// import * from './messageDispather'
import appStore from "../store/appStore"
import localStore from "../store/localStore.js"

const urlLocale = 'http://localhost:5000/'
const wsLocale = 'ws://localhost:5000'

const  wsStart =  wsURL =>
{
    appStore.SetWsStatus('connecting')
    const ws = new WebSocket(wsURL)

    //коннект
    ws.onopen = _ =>
    {
        console.log('yes!!!')
        // if(localStore.getItem('token'))
        // {
        //     //wsLogInAuto()
        // }
        appStore.SetWsStatus('connected');
    }

    //чекаем ошибочки
    ws.onerror = e => console.log('error: ' + e.message)

    //реконнект
    ws.onclose = _ =>
    {
        appStore.SetWsStatus('disconnected')
        setTimeout(_ => wsStart(wsURL), 3000)
    }
}

wsStart(wsLocale)
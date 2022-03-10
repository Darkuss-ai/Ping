import {makeAutoObservable} from "mobx";

class AppStore
{
    wsStatus = 'initial' //'initial', 'connecting', 'connected', 'disconnected'
    loginStatus = 'notAuth' //'notAuth', 'auth', 'credentError', 'tokenOutdate'

    constructor() { makeAutoObservable(this) }

    SetWsStatus(status) { this.wsStatus = status}
    
    SetLoginStatus(status){ this.loginStatus = status }
}

export default new AppStore()
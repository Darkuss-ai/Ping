import {makeAutoObservable} from "mobx";

class AppStore
{
    wsStatus = 'initial' //'initial', 'connecting', 'connected', 'disconnected'
    loginStatus = 'notAuth' //'notAuth', 'auth', 'credentError', 'tokenOutdate'
    profile = {}
    constructor() { makeAutoObservable(this) }

    SetWsStatus(status) { this.wsStatus = status}
    
    SetLoginStatus(status){ this.loginStatus = status }

    SetProfile(profile){ this.profile = profile}
}

export default new AppStore()
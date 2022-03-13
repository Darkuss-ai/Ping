import {makeAutoObservable} from "mobx";

class localStore
{
    token = '' 
    refreshToken = ''
    constructor() { makeAutoObservable(this) }

    SetToken(token) { this.token = token }
    SetRefreshToken(token) { this.refreshToken = token }
}

export default new localStore()
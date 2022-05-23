import {makeAutoObservable} from "mobx";

interface profile
{
    name: string;
    surname: string;
    login: string;
    age: number;
}

export default class LocalStore
{
    private _token: string | null = null 
    private _refreshToken: string | null = null
    private _profile: profile | null = null;

    constructor() { makeAutoObservable(this) }

    //SETTER
    set token(token: string | null) { this.token = token }
    set refreshToken(token: string | null) { this.refreshToken = token }
    set profile(profile: profile | null ) { this._profile = profile }
    
    //GETTERS
    get token(): null | string { return this.token }
    get refreshToken(): null | string { return this.refreshToken }
    get profile(): profile | null { return this._profile }
}
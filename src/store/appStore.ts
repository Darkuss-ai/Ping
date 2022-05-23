import {makeAutoObservable} from "mobx";

export default class AppStore
{
    private _wsStatus: string = 'initial'; //'initial', 'connecting', 'connected', 'disconnected'
    private _loginStatus: string = 'notAuth'; //'notAuth', 'auth', 'credentError', 'tokenOutdate'
    private _error: string[] = ['АБОБА1', 'АБОБА2'];
    private _error_add: boolean = false;

    constructor() { makeAutoObservable(this) }

    //SETTERS
    set wsStatus(status: string) { this._wsStatus = status }
    set loginStatus(status: string) { this._loginStatus = status }
    set error_add(status: boolean) { this._error_add = status }

    //GETTERS
    get wsStatus(): string { return this._wsStatus }
    get loginStatus(): string { return this._loginStatus }
    get error(): string[] { return this._error }
    get error_add(): boolean { return this._error_add }

    
    push_error(error_detail: string): void { this._error.push(error_detail) }

    clear_error(): void { this.error.length = 0 }
    
    pop_error(i: number): string
    {
        const p: string = this._error[i];
        this._error.splice(i, 1);
        return p;
    }
}
import {makeAutoObservable} from "mobx";

class Login
{
    status = false
    login = ''

    constructor() {makeAutoObservable(this)}

    Auth(login) {
        this.status = true;
        this.login = login;
    }
    Exit()
    {
        this.status = true;
        this.login = '';
    }
}

export default new Login()
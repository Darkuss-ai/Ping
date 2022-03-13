import appStore from "../store/appStore";
import localStore from "../store/localStore";

export const wsLogIn = (username, password) =>
{
    window.viWSSend({
        action: 'login',
        username,
        password
    })
}

export const wsLogInAuto = _ => 
{
    window.viWSSend({
        action: 'login:auto',
        token: localStore.token
    })
}

export const wsRegistration = (username, email, password) =>
{
    window.viWSSend({
        action: 'registration', 
        username, 
        email,
        password
    })
}

export const wsGetProfile = _ =>
{
    window.viWSSend({
        action: 'profile',
        token: localStore.token
    })
}

export const wsUpdateToken = _ =>
{
    window.viWSSend({
        action: 'update',
        token: localStore.token
    })
}
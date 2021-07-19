import axios from 'axios';
import qs from 'qs';

type LoginResponse = {
    access_token: string;
    token_type:string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId: number;
}

export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

const basicHeader = () => 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET);
const tokenKey = 'authData';

type LoginData = {
    username : string;
    password: string;
}

export const requestBackendLogin = (loginData: LoginData) => {
    const headers = {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : basicHeader()
    }

    const data = qs.stringify( {
        ...loginData,
        grant_type : 'password'
    })

    return axios({method: 'POST', baseURL: BASE_URL, url : '/oauth/token', data, headers});
}

export const saveAuthData = (obj: LoginResponse) => { //salva os dados da autorização
    return localStorage.setItem(tokenKey, JSON.stringify(obj)); //pega o objeto e transforma em string
}

export const getAuthData = () => { //retorna o dado do tipo LoginResponse
    const str = localStorage.getItem(tokenKey) ?? "{}";
    return JSON.parse(str) as LoginResponse;
}
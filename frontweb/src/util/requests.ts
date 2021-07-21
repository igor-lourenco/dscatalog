import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';
import jwtDecode from 'jwt-decode';

type LoginResponse = {
    access_token: string;
    token_type:string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId: number;
}

type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

export type TokenData = {
    exp : number;
    user_name : string;
    authorities: Role[];
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

export const requestBackend = (config: AxiosRequestConfig) => {
    const headers = config.withCredentials ? {
        ...config.headers,
        Authorization: "Bearer " + getAuthData().access_token //acrescenta o token no corpo
    } : config.headers; //se der erro

    return axios({...config, baseURL: BASE_URL, headers });
}

export const saveAuthData = (obj: LoginResponse) => { //salva os dados da autorização
    return localStorage.setItem(tokenKey, JSON.stringify(obj)); //pega o objeto e transforma em string
}

export const getAuthData = () => { //retorna o dado do tipo LoginResponse
    const str = localStorage.getItem(tokenKey) ?? "{}";
    return JSON.parse(str) as LoginResponse;
}


export const removeAuthData = () => {
    localStorage.removeItem(tokenKey) //remove o token do localStorage
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(error.response.status === 401 || error.response.status === 403 ){
    history.push('/admin/auth');
}
    return Promise.reject(error);
  });

export const getTokenData = () : TokenData | undefined => {
    const LoginResponse = getAuthData(); //pega o token salvo e guarda na variavel
    try{
    return jwtDecode(LoginResponse.access_token) as TokenData;
    }catch(error) {
        return undefined;
    }
}

export const isAuthenticated = () : boolean => {
    const tokenData = getTokenData(); //pega os dados do token 
    return (tokenData && tokenData.exp * 1000 > Date.now()) ? true : false;   
}
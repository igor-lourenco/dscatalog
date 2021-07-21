const tokenKey = 'authData';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userId: number;
};

export const saveAuthData = (obj: LoginResponse) => {
  //salva os dados da autorização
  return localStorage.setItem(tokenKey, JSON.stringify(obj)); //pega o objeto e transforma em string
};

export const getAuthData = () => {
  //retorna o dado do tipo LoginResponse
  const str = localStorage.getItem(tokenKey) ?? '{}';
  return JSON.parse(str) as LoginResponse;
};

export const removeAuthData = () => {
  localStorage.removeItem(tokenKey); //remove o token do localStorage
};

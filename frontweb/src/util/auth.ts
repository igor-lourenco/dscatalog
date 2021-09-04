import { getTokenData } from './token';
import { Role } from 'types/role';


export const isAuthenticated = (): boolean => {
  const tokenData = getTokenData(); //pega os dados do token
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

export const hasAnyRoles = (roles: Role[]): boolean => {
  if (roles.length === 0) {
    //testa se o usuario possui algum role
    return true;
  }

  const tokenData = getTokenData();

  if (tokenData !== undefined) {
    //testa se o token não for indefinido
    for (var i = 0; i < roles.length; i++) {
      //percorre a lista de roles
      if (tokenData.authorities.includes(roles[i])) {
        //testa se tem algum role na posição i
        return true;
      }
    }
    //return roles.some(role => tokenData.authorities.includes(role));
  }
  return false;
};

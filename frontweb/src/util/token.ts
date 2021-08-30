import jwtDecode from "jwt-decode";
import { Role } from "../types/role";
import { getAuthData } from "./storage";

export type TokenData = {
    exp: number;
    user_name: string;
    authorities: Role[];
  };
  
  export const getTokenData = (): TokenData | undefined => {
    const LoginResponse = getAuthData(); //pega o token salvo e guarda na variavel
    try {
      return jwtDecode(LoginResponse.access_token) as TokenData;
    } catch (error) {
      return undefined;
    }
  };
import { Roles } from "./roles";

export type Users = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Roles [];
}
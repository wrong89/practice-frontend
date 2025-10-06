export interface User {
    id: string;
    login: string,
    password: string,
    name: string,
    surname: string,
    patronymic: string,
    phone: string,
    email: string,
    isAdmin: boolean,
}

export interface UserRegisterPayload {
    login: string,
    password: string,
    name: string,
    surname: string,
    patronymic: string,
    phone: string,
    email: string,
}

export interface UserRegisterResponse {
    id: number
}

export interface UserLoginPayload {
    login: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}
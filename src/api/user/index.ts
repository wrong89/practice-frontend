import handleAPIError from '../error';
import { api } from '../index';
import type { LoginResponse, User, UserLoginPayload, UserRegisterPayload } from './types';

export async function registerUser(payload: UserRegisterPayload): Promise<User> {
    try {
        const res = await api.post<User>('/user/register', payload);
        return res.data;
    } catch (err) {
        handleAPIError(err);
    }
}

export async function loginUser(payload: UserLoginPayload): Promise<LoginResponse> {
    try {
        const res = await api.post<LoginResponse>('/user/login', payload);
        return res.data;
    } catch (err) {
        handleAPIError(err);
    }
}

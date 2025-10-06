import handleAPIError from '../error';
import { api } from '../index';
import type { LoginResponse, UserLoginPayload, UserRegisterPayload, UserRegisterResponse } from './types';

export async function registerUser(payload: UserRegisterPayload): Promise<UserRegisterResponse> {
    try {
        const res = await api.post<UserRegisterResponse>('/user/register', payload);
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

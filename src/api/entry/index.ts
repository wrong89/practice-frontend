import handleAPIError from '../error';
import { api } from '../index';
import type { CreateEntry, CreateEntryResponse } from './types';

export async function createEntry(payload: CreateEntry, userToken: string): Promise<CreateEntryResponse> {
    try {
        const res = await api.post<CreateEntryResponse>('/entry', payload, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });
        return res.data;
    } catch (err) {
        handleAPIError(err);
    }
}
import { getCurrentUser } from '@/utils/auth';
import handleAPIError from '../error';
import { api } from '../index';
import { userIsAdmin } from '../user';
import type { CreateEntry, Entry, GetEntriesResponse } from './types';

export async function createEntry(payload: CreateEntry, userToken: string): Promise<Entry> {
    try {
        const res = await api.post<Entry>('/entry', payload, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });
        return res.data;
    } catch (err) {
        handleAPIError(err);
    }
}

export async function getEntries(userToken: string): Promise<Entry[]> {
    try {
        const user = getCurrentUser()
        if (!user) {
            console.log("User not found")
            throw new Error("User not found")
        }

        let url = `/entry`

        const { is_admin } = await userIsAdmin(+user.uid)
        if (!is_admin) {
            url += `?user_id=${user.uid}`
        }

        console.log("isAdmin", is_admin, url)

        const res = await api.get<GetEntriesResponse>(url, {
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        });

        return res.data.entries;
    } catch (err) {
        handleAPIError(err);
    }
}
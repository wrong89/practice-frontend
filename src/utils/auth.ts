import type { User } from "@/api/user/types";

const USER_KEY = "user_data";

export function isAuthenticated(): boolean {
    const data = localStorage.getItem(USER_KEY);
    return !!data; // true, если данные есть
}

export function getCurrentUser(): User | null {
    const data = localStorage.getItem(USER_KEY);
    if (!data) return null;

    try {
        return JSON.parse(data) as User;
    } catch (err) {
        console.error("Failed to parse user data from localStorage:", err);
        return null;
    }
}

export function setCurrentUser(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function logout() {
    localStorage.removeItem(USER_KEY);
}

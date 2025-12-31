import type { User } from '../models';
import { loginApi } from '../api';

let currentUser: User | null = null;

export const authService = {
    async login(credentials: { email: string; password: string }): Promise<User> {
        console.log('authService.login called');
        const response = await loginApi.login({
            account: credentials.email,
            password: credentials.password,
        });

        if (response.code === 0 && response.result?.token) {
            currentUser = {
                id: '1',
                email: credentials.email,
                name: credentials.email,
                role: 'User',
            };
            return currentUser;
        }

        throw new Error('Dang nhap that bai');
    },

    async logout(): Promise<void> {
        loginApi.logout();
        currentUser = null;
    },

    getCurrentUser(): User | null {
        return currentUser;
    },

    isAuthenticated(): boolean {
        return loginApi.isAuthenticated();
    },
};

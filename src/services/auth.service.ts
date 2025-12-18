import type { LoginCredentials, User } from '../models';

let currentUser: User | null = null;

export const authService = {
    async login(credentials: LoginCredentials): Promise<User> {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (credentials.email === 'admin' && credentials.password === '123456') {
            currentUser = {
                id: '1',
                email: 'admin@gmail.com',
                name: 'Administrator',
                role: 'Admin',
            };
            return currentUser;
        }

        throw new Error('Invalid credentials');
    },

    async logout(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 500));
        currentUser = null;
    },

    getCurrentUser(): User | null {
        return currentUser;
    },

    isAuthenticated(): boolean {
        return currentUser !== null;
    },
};

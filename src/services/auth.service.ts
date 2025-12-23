import type { LoginCredentials, User } from '../models';
let currentUser: User | null = null;
export const authService = {
    async login(credentials: LoginCredentials): Promise<User> {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const { email, password } = credentials;
        if (email === 'admin' && password === '123') {
            currentUser = {
                id: '1',
                email: 'admin',
                name: 'Administrator',
                role: 'Admin',
            };
            return currentUser;
        }
        if (email && email.includes('@gmail.com') && password === '123') {
            const username = email.split('@')[0];
            const displayName = username.charAt(0).toUpperCase() + username.slice(1);
            currentUser = {
                id: Date.now().toString(), // Generate unique ID
                email: email,
                name: displayName,
                role: 'User',
            };
            return currentUser;
        }
        if (email && email.includes('@') && password === '123') {
            const username = email.split('@')[0];
            const displayName = username.charAt(0).toUpperCase() + username.slice(1);
            currentUser = {
                id: Date.now().toString(), // Generate unique ID
                email: email,
                name: displayName,
                role: 'User',
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

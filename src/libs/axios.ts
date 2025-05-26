import { User } from '@/types';
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://gorest.co.in/public/v2',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('gorest_token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const validate = async (token: string, email: string) => {
    try {
        const res = await axios.get('https://gorest.co.in/public/v2/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const users = res.data;

        const matchedUser = users.find((user: User) => user.email === email);

        if (matchedUser) {
            return { valid: true, user: matchedUser };
        } else {
            return { valid: false, error: 'Email not found' };
        }
    } catch (err) {
        console.error('Validation error:', err);
        return { valid: false, error: 'Token invalid' };
    }
};

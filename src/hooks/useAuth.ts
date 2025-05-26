'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useNotLogged = () => {
    const router = useRouter();

    useEffect(() => {
        const token =
            localStorage.getItem('gorest_token') || sessionStorage.getItem('gorest_token');

        if (!token) {
            router.push('/login');
        }
    }, [router]);
};

export const useLogged = () => {
    const router = useRouter();

    useEffect(() => {
        const token =
            localStorage.getItem('gorest_token') || sessionStorage.getItem('gorest_token');

        if (token) {
            router.push('/dashboard');
        }
    }, [router]);
};



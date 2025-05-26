'use client';
import '@ant-design/v5-patch-for-react-19';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sora } from 'next/font/google';
import { ReactNode } from 'react';
import "./globals.css";

const sora = Sora({
    subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    });

    return (
        <html lang="en">
            <body className={`${sora.className} antialiased`}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </body>
        </html>
    );
}

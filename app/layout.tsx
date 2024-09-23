import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navigation from './_components/shared/Navigation';
import ThemeProvider from './_components/shared/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import QueryProvider from './_components/shared/providers/QueryProvider';
import SessionAppProvider from './_components/shared/providers/SessionProvider';
import ScrollToTop from './_components/shared/ScrollToTop';
import SessionCheckHelper from './_components/auth/SessionChcekHelper';
import { SubmittedProvider } from './_context/SubmittedContext';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'DocuNest',
    description: 'Application for taking notes with AI power',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider>
                    <QueryProvider>
                        <SessionAppProvider>
                            <SessionCheckHelper>
                                <SubmittedProvider>
                                    <Navigation />
                                    {children}
                                    <ScrollToTop />
                                    <Toaster />
                                </SubmittedProvider>
                            </SessionCheckHelper>
                        </SessionAppProvider>
                    </QueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

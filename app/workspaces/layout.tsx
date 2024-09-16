import Navigation from '../_components/shared/Navigation';
import Sidebar from '../_components/shared/Sidebar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body>
                
                <div className='dark:bg-dark dark:text-light flex min-h-screen'>
                    <Sidebar />
                    <div className='flex-1 overflow-auto'>{children}</div>
                </div>
            </body>
        </html>
    );
}

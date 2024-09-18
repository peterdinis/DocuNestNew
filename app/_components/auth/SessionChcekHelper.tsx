'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';

interface ISessionCheckHelperProps {
    children?: ReactNode;
}

const SessionCheckHelper: FC<ISessionCheckHelperProps> = ({
    children,
}: ISessionCheckHelperProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === 'loading') return;

        if (!session && pathname !== '/' && pathname !== '/register') {
            router.push('/login');
        }
    }, [session, status, router, pathname]);

    if (status === 'loading') {
        return <Loading />;
    }

    if (session || pathname === '/' || pathname === '/register') {
        return <>{children}</>;
    }
    
    return children
};

export default SessionCheckHelper;
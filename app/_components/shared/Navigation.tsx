'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeButton from './ThemeButton';
import { useSession, signOut } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const Navigation: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();
    const toggleMenu = () => setIsOpen(!isOpen);
    const { toast } = useToast();
    const router = useRouter();

    const logoutUser = () => {
        signOut({
            redirect: false,
        });
        toast({
            title: 'Logout DONE',
            duration: 2000,
            className: 'bg-green-800 text-white font-bold',
        });
        router.push('/login');
    };

    return (
        <nav className='bg-background shadow-md'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between'>
                    <div className='flex items-center'>
                        <Link href='/' className='flex-shrink-0'>
                            <span className='text-2xl font-bold text-primary'>
                                DocuNest
                            </span>
                        </Link>
                        {!session?.user && (
                            <div className='hidden md:block'>
                                <div className='ml-10 flex items-baseline space-x-4'>
                                    <Link
                                        href='/dashboard'
                                        className='prose-a: prose rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary dark:text-sky-50'
                                    >
                                        Services
                                    </Link>
                                    <Link
                                        href='/projects'
                                        className='prose-a: prose rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary dark:text-sky-50'
                                    >
                                        Pricing
                                    </Link>
                                    <Button
                                        variant={'outline'}
                                        className='prose-a: prose rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary dark:text-sky-50'
                                    >
                                        <Link
                                            className='dark:text-white'
                                            href='/register'
                                        >
                                            Register
                                        </Link>
                                    </Button>
                                    <Button
                                        variant={'outline'}
                                        className='prose-a: prose rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary dark:text-white'
                                    >
                                        <Link
                                            className='dark:text-white'
                                            href='/login'
                                        >
                                            Login
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='hidden md:block'>
                        <div className='ml-4 flex items-center md:ml-6'>
                            {session?.user && (
                                <>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant='ghost'
                                                className='relative ml-3'
                                            >
                                                <span className='sr-only'>
                                                    Open user menu
                                                </span>
                                                <User className='h-5 w-5' />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='end'>
                                            <DropdownMenuLabel>
                                                {session?.user.name}
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link href='/dashboard'>
                                                    Profile
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={logoutUser}>
                                                Sign out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <div className='ml-5'>
                                        <ThemeButton />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='md:hidden'>
                        <Button
                            variant='ghost'
                            onClick={toggleMenu}
                            size='icon'
                        >
                            <span className='sr-only'>Open main menu</span>
                            {isOpen ? (
                                <X className='h-6 w-6' />
                            ) : (
                                <Menu className='h-6 w-6' />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
                    <Link
                        href='/dashboard'
                        className='block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-primary dark:text-sky-50'
                    >
                        Dashboard
                    </Link>
                    <Link
                        href='/projects'
                        className='block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-primary dark:text-sky-50'
                    >
                        Projects
                    </Link>
                    <Link
                        href='/tasks'
                        className='block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-primary dark:text-sky-50'
                    >
                        Tasks
                    </Link>
                    <Link
                        href='/team'
                        className='block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-primary dark:text-sky-50'
                    >
                        Team
                    </Link>
                </div>
                {session?.user && (
                    <div className='border-t border-gray-200 pb-3 pt-4'>
                        <div className='flex items-center px-5'>
                            <div className='flex-shrink-0'>
                                <User className='h-10 w-10 rounded-full' />
                            </div>
                            <div className='ml-3'>
                                <div className='text-base font-medium text-gray-800 dark:text-sky-50'>
                                    {session?.user.name}
                                </div>
                                <div className='text-sm font-medium text-gray-500 dark:text-sky-50'>
                                    {session?.user.email}
                                </div>
                            </div>
                        </div>
                        <div className='mt-3 space-y-1 px-2'>
                            <Button
                                variant='ghost'
                                className='block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-600 hover:text-primary dark:text-sky-50'
                            >
                                <Link href='/dashboard'>Dashboard</Link>
                            </Button>
                            <Button
                                variant='ghost'
                                onClick={logoutUser}
                                className='block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-600 hover:text-primary dark:text-sky-50'
                            >
                                Sign out
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
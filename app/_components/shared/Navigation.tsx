'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Bell, User } from 'lucide-react';
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

const Navigation: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

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
                                    Register
                                </Button>
                                <Button
                                    variant={'outline'}
                                    className='prose-a: prose rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary dark:text-sky-50'
                                >
                                    Login
                                </Button>
                            </div>
                        </div>
                        <div className='ml-5'>
                            <ThemeButton />
                        </div>
                    </div>
                    <div className='hidden md:block'>
                        <div className='ml-4 flex items-center md:ml-6'>
                            <Button variant='ghost' size='icon'>
                                <Bell className='h-5 w-5' />
                                <span className='sr-only'>
                                    View notifications
                                </span>
                            </Button>
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
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Sign out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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

            {/* Toggle mobile menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
                    <Link
                        href='/dashboard'
                        className='block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-primary'
                    >
                        Dashboard
                    </Link>
                    <Link
                        href='/projects'
                        className='block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-primary'
                    >
                        Projects
                    </Link>
                    <Link
                        href='/tasks'
                        className='block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-primary'
                    >
                        Tasks
                    </Link>
                    <Link
                        href='/team'
                        className='block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-primary'
                    >
                        Team
                    </Link>
                </div>
                <div className='border-t border-gray-200 pb-3 pt-4'>
                    <div className='flex items-center px-5'>
                        <div className='flex-shrink-0'>
                            <User className='h-10 w-10 rounded-full' />
                        </div>
                        <div className='ml-3'>
                            <div className='text-base font-medium text-gray-800'>
                                Jane Doe
                            </div>
                            <div className='text-sm font-medium text-gray-500'>
                                jane@example.com
                            </div>
                        </div>
                        <Button variant='ghost' size='icon' className='ml-auto'>
                            <Bell className='h-6 w-6' />
                            <span className='sr-only'>View notifications</span>
                        </Button>
                    </div>
                    <div className='mt-3 space-y-1 px-2'>
                        <Button
                            variant='ghost'
                            className='block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-primary'
                        >
                            Profile
                        </Button>
                        <Button
                            variant='ghost'
                            className='block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-primary'
                        >
                            Settings
                        </Button>
                        <Button
                            variant='ghost'
                            className='block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-primary'
                        >
                            Sign out
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;

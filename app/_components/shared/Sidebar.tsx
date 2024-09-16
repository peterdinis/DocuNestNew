'use client';

import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    MenuIcon,
    HomeIcon,
    SettingsIcon,
    UserIcon,
    FileTextIcon,
} from 'lucide-react';

const navItems = [
    { icon: HomeIcon, label: 'Home', href: '/dashboard' },
    { icon: FileTextIcon, label: 'Workspaces', href: '/workspaces' },
    { icon: UserIcon, label: 'Teams', href: '/teams' },
    { icon: SettingsIcon, label: 'Settings', href: '/settings' },
];

const Sidebar: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className='flex h-screen'>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant='outline'
                            size='icon'
                            className='fixed left-4 top-4 z-40 lg:hidden'
                        >
                            <MenuIcon className='h-4 w-4' />
                            <span className='sr-only'>Toggle Sidebar</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='left' className='w-[240px] p-0'>
                        <div className='h-full py-6'>
                            <div className='mb-4 px-4'>
                                <h2 className='text-primary text-lg font-semibold'>
                                    Docu Nest
                                </h2>
                            </div>
                            <ScrollArea className='h-[calc(100vh-5rem)] px-2'>
                                <nav className='space-y-1'>
                                    {navItems.map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.href}
                                            className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                                        >
                                            <item.icon className='h-4 w-4' />
                                            {item.label}
                                        </a>
                                    ))}
                                </nav>
                            </ScrollArea>
                        </div>
                    </SheetContent>
                </Sheet>

                <aside className='hidden w-[240px] border-r lg:block'>
                    <div className='h-full py-6'>
                        <div className='mb-4 px-4'>
                            <h2 className='text-primary text-xl font-semibold'>Docu Nest</h2>
                        </div>
                        <ScrollArea className='h-[calc(100vh-5rem)] px-2'>
                            <nav className='space-y-1'>
                                {navItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                                    >
                                        <item.icon className='h-4 w-4' />
                                        {item.label}
                                    </a>
                                ))}
                            </nav>
                        </ScrollArea>
                    </div>
                </aside>
            </div>
        </>
    );
};

export default Sidebar;
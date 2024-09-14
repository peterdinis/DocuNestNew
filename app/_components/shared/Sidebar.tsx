'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, MoreVertical, Menu, X } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Document {
    id: number;
    name: string;
}

const Sidebar: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { data: session } = useSession();

    const documents: Document[] = [
        { id: 1, name: 'Untitled document' },
        { id: 2, name: 'Untitled document' },
        { id: 3, name: 'Untitled document' },
    ];

    const storageUsed = 3;
    const maxStorage = 6;

    const sidebarVariants = {
        open: {
            width: '18rem',
            transition: { type: 'tween', duration: 0.3, ease: 'easeOut' },
        },
        closed: {
            width: '4rem',
            transition: { type: 'tween', duration: 0.3, ease: 'easeOut' },
        },
    };

    return (
        <motion.div
            className='flex h-screen flex-col bg-white p-4 shadow-lg'
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            variants={sidebarVariants}
        >
            <div className='mb-6 flex items-center justify-between'>
                {isOpen && <span className='font-bold prose prose-p:'> {session!.user!.email}</span>}
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? (
                        <X className='h-6 w-6 text-gray-700' />
                    ) : (
                        <Menu className='h-6 w-6 text-gray-700' />
                    )}
                </button>
            </div>

            {isOpen && (
                <div className='mb-6'>
                    <div className='mb-4 flex items-center justify-between'>
                        <h2 className='text-lg font-semibold'>
                            Create new workspace
                        </h2>
                        <Plus className='h-5 w-5 cursor-pointer text-gray-700' />
                    </div>
                </div>
            )}

            <div className='space-y-4'>
                {documents.map((doc) => (
                    <div
                        key={doc.id}
                        className='flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-200'
                    >
                        <div className='flex items-center space-x-2'>
                            <FileText className='h-5 w-5 text-blue-500' />
                            {isOpen && (
                                <span className='text-sm'>{doc.name}</span>
                            )}
                        </div>
                        <MoreVertical className='h-4 w-4 text-gray-500' />
                    </div>
                ))}
            </div>

            {isOpen && (
                <div className='mt-auto'>
                    <div className='mb-2 h-2 rounded-full bg-gray-200'>
                        <div
                            className='h-2 rounded-full bg-blue-500'
                            style={{
                                width: `${(storageUsed / maxStorage) * 100}%`,
                            }}
                        />
                    </div>
                    <p className='text-xs text-gray-500'>{`${storageUsed} out of ${maxStorage} files used`}</p>
                </div>
            )}
        </motion.div>
    );
};

export default Sidebar;
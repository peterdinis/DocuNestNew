'use client';

import { FC } from 'react';
import { Edit3, FolderOpen, Upload } from 'lucide-react';
import ServiceCard from './ServiceCard';

const HeroServices: FC = () => {
    return (
        <div id='services' className='py-16'>
            <div className='m-auto space-y-16 px-6 text-gray-500 xl:container md:px-12'>
                <div>
                    <h2 className='mt-4 text-2xl font-bold text-gray-800 dark:text-white md:text-4xl'>
                        Enhance Your Document Writing Experience{' '}
                        <br className='sm:block' hidden />
                        with AI-Powered Tools
                    </h2>
                </div>
                <div className='mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                    <ServiceCard
                        icon={<Edit3 />}
                        iconHeaderText='AI Writing Assistance'
                        iconHeaderDesc='Leverage AI to enhance your writing with suggestions, grammar checks, and style improvements.'
                    />
                    <ServiceCard
                        icon={<FolderOpen />}
                        iconHeaderText='Intelligent Organization'
                        iconHeaderDesc='Automatically organize your documents into relevant folders and categories using AI algorithms.'
                    />
                    <ServiceCard
                        icon={<Upload />}
                        iconHeaderText='Document Upload'
                        iconHeaderDesc='Easily upload and integrate your documents, making them accessible for AI-enhanced editing and organization.'
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroServices;

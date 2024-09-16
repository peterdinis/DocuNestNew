'use client';

import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { FC, useState } from 'react';
import AppPagination from '../shared/AppPagination';

const people = [
    {
        id: 1,
        name: 'John Doe',
        designation: 'Software Engineer',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
        id: 2,
        name: 'Robert Johnson',
        designation: 'Product Manager',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 3,
        name: 'Jane Smith',
        designation: 'Data Scientist',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 4,
        name: 'Emily Davis',
        designation: 'UX Designer',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 5,
        name: 'Tyler Durden',
        designation: 'Soap Developer',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
    },
    {
        id: 6,
        name: 'Dora',
        designation: 'The Explorer',
        image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80',
    },
    {
        id: 7,
        name: 'Dora',
        designation: 'The Explorer',
        image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80',
    },
    {
        id: 8,
        name: 'Anna Brown',
        designation: 'Marketing Specialist',
        image: 'https://images.unsplash.com/photo-1532053063800-2f7e9b3b6591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFya2V0aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 9,
        name: 'Mike Wilson',
        designation: 'Sales Executive',
        image: 'https://images.unsplash.com/photo-1561477860-10e90d5564f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhbGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 10,
        name: 'Lisa Taylor',
        designation: 'HR Manager',
        image: 'https://images.unsplash.com/photo-1603659467734-7a8d5e4a89b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aHJ8fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 11,
        name: 'Oliver James',
        designation: 'Business Analyst',
        image: 'https://images.unsplash.com/photo-1555685818-c5899db4d897?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3MlMjBhbmlzdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 12,
        name: 'Sophia White',
        designation: 'Content Writer',
        image: 'https://images.unsplash.com/photo-1561013836-28d0a7e1f925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29udGVudCB3cml0ZXJ8ZW51fDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 13,
        name: 'Ethan Harris',
        designation: 'Graphic Designer',
        image: 'https://images.unsplash.com/photo-1531883032335-d1db21f63f78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JhcGhpYyUyMGRlc2lnbmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 14,
        name: 'Mia Clark',
        designation: 'Software Tester',
        image: 'https://images.unsplash.com/photo-1565123510-9f4f8e9e80e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c29mdHdhcmV0ZXN0ZXJ8ZW51fDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 15,
        name: 'Lucas Martinez',
        designation: 'Customer Support',
        image: 'https://images.unsplash.com/photo-1561205103-86f4d6c391b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3VzdG9tZXJzdXBwb3J0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 16,
        name: 'Grace Lee',
        designation: 'Social Media Manager',
        image: 'https://images.unsplash.com/photo-1546644727-2d8f8f7d2346?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c29jaWFsJTIwbWVkaWElMjBtYW5hZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 17,
        name: 'James Wilson',
        designation: 'SEO Specialist',
        image: 'https://images.unsplash.com/photo-1552633266-f2e59d98dabe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNlbyUyMHNwZWNpYWxpc3R8ZW51fDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 18,
        name: 'Isabella Young',
        designation: 'Web Developer',
        image: 'https://images.unsplash.com/photo-1553642211-0e87de59b4bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2ViJTIwZGV2ZWxvcGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 19,
        name: 'Liam Robinson',
        designation: 'DevOps Engineer',
        image: 'https://images.unsplash.com/photo-1591218368552-07e0d0b6d1e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGV2b3BzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
];

const ITEMS_PER_PAGE = 5;

const AllTeamMembers: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(people.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className='mb-10 flex w-full flex-row items-center justify-center'>
                <AnimatedTooltip items={people} />
                <br />
            </div>
            <AppPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default AllTeamMembers;

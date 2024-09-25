"use client"

import useDisplayMyMemberWorkspaces from '@/app/_hooks/workspace-mebers/useDisplayMyMemberWorkspaces';
import { FC } from 'react';
import Loading from '../../shared/Loading';

const MemberWorskapceLists: FC = () => {
    const {data, isLoading, isError} = useDisplayMyMemberWorkspaces();

    if(isLoading) return <Loading />

    if (isError) {
        return (
            <p className='text-xl font-bold text-red-700'>
                Something went wrong
            </p>
        );
    }

    

    return <>Member workspace Lists</>;
};

export default MemberWorskapceLists;

import { FC } from 'react';
import Header from '../shared/Header';
import WorkspacesLists from './WorkspacesLists';
import GlobalLayout from '../shared/GlobalLayout';
import MemberWorskapceLists from './members/MemberWorkspaceLists';

const WorkspacesWrapper: FC = () => {
    return (
        <GlobalLayout>
            <main className='flex-1 overflow-auto p-8'>
                <div className='mx-auto max-w-4xl'>
                    <Header text={`Workspaces`} />
                    <br />
                    <WorkspacesLists />
                    <br />
                    <MemberWorskapceLists />
                </div>
            </main>
        </GlobalLayout>
    );
};

export default WorkspacesWrapper;

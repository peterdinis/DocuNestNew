import { FC } from 'react';
import Header from '../shared/Header';
import WorkspacesLists from './WorkspacesLists';

const WorkspacesWrapper: FC = () => {
    return (
        <main className='flex-1 overflow-auto p-8'>
            <div className='mx-auto max-w-4xl'>
                <Header text={`Workspaces`} />
                <br />
                <WorkspacesLists />
            </div>
        </main>
    );
};

export default WorkspacesWrapper;

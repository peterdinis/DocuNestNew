import { FC } from 'react';
import GlobalLayout from '../shared/GlobalLayout';
import Header from '../shared/Header';
import SettingsCard from './SettingsCard';

const SettingsWrapper: FC = () => {
    return (
        <>
            <GlobalLayout>
                <main className='flex-1 overflow-auto p-8'>
                    <div className='mx-auto max-w-4xl'>
                        <Header text={`Settings`} />
                        <br />
                        <SettingsCard />
                    </div>
                </main>
            </GlobalLayout>
        </>
    );
};

export default SettingsWrapper;

'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface SubmittedContextType {
    submitted: boolean;
    setSubmitted: (value: boolean) => void;
}

const SubmittedContext = createContext<SubmittedContextType | undefined>(
    undefined,
);

export const useSubmittedContext = () => {
    const context = useContext(SubmittedContext);
    if (!context) {
        throw new Error(
            'useSubmittedContext must be used within a SubmittedProvider',
        );
    }
    return context;
};

export const SubmittedProvider = ({ children }: { children: ReactNode }) => {
    const [submitted, setSubmitted] = useState<boolean>(false);

    return (
        <SubmittedContext.Provider value={{ submitted, setSubmitted }}>
            {children}
        </SubmittedContext.Provider>
    );
};

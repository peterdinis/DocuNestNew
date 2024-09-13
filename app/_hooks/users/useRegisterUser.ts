'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { RegisterUser, registerUser } from '@/app/_store/mutations/authMutations';

const useRegisterUser = () => {
    const router = useRouter();
    const {toast} = useToast();

    return useMutation({
        mutationKey: ['registerUser'],
        mutationFn: async (data: RegisterUser) => registerUser(data),
        onSuccess: () => {
            toast({
                title: "Register DONE",
                duration: 2000,
                className: "bg-green-800 text-white font-bold"
            })
            router.push('/login');
        },
        onError: () => {
            toast({
                title: "Register Failed",
                duration: 2000,
                className: "bg-red-800 text-white font-bold"
            })
        },
    });
};

export default useRegisterUser;
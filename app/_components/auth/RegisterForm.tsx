'use client';

import Link from 'next/link';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import useRegisterUser from '@/app/_hooks/users/useRegisterUser';
import { registerSchema } from './authSchema';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardFooter,
    CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RegisterUser } from '@/app/_store/mutations/authMutations';
import Loading from '../shared/Loading';
import { useToast } from '@/app/_hooks/shared/use-toast';

const RegisterForm: FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterUser>({
        resolver: zodResolver(registerSchema),
    });

    const { mutate: registerUserMut, isPending } = useRegisterUser();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit = async (data: RegisterUser) => {
        try {
            await registerUserMut(data, {
                onSuccess: () => {
                    reset();
                },
                onError: (error: Error) => {
                    if (error instanceof Error) {
                        toast({
                            title: 'An unexpected error occurred. Please try again later.',
                            duration: 2000,
                            className:
                                'bg-red-800 text-white font-bold text-xl',
                        });
                    } else {
                        toast({
                            title: 'Something went wrong. Please try again.',
                            duration: 2000,
                            className:
                                'bg-red-800 text-white font-bold text-xl',
                        });
                    }
                },
            });
        } catch (err) {
            toast({
                title: 'An unexpected error occurred. Please try again later.',
                duration: 2000,
                className: 'bg-red-800 text-white font-bold text-xl',
            });
        }
    };

    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <Card className='w-full max-w-md'>
                <CardHeader className='text-center text-2xl'>
                    Register
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className='space-y-4'>
                        <div className='space-y-2'>
                            <div>Name</div>
                            <Input
                                id='name'
                                type='text'
                                placeholder='Your name'
                                required
                                {...register('name')}
                            />
                            {errors.name && (
                                <p className='font-bold text-red-600'>
                                    Name is required
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <div>Email</div>
                            <Input
                                id='email'
                                type='email'
                                placeholder='Your email'
                                required
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className='font-bold text-red-600'>
                                    Email is required
                                </p>
                            )}
                        </div>

                        <div className='relative space-y-2'>
                            <div>Password</div>
                            <div className='flex items-center'>
                                <Input
                                    id='password'
                                    placeholder='Enter your password'
                                    {...register('password')}
                                    type={isVisible ? 'text' : 'password'}
                                    className='pr-10'
                                />
                                <button
                                    type='button'
                                    onClick={toggleVisibility}
                                    className='absolute right-3 mt-5 transform -translate-y-1/2'
                                >
                                    {isVisible ? (
                                        <EyeOff className='h-5 w-5' />
                                    ) : (
                                        <Eye className='h-5 w-5' />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className='font-bold text-red-600'>
                                    Password is required
                                </p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className='flex flex-col space-y-2'>
                        <Button
                            type='submit'
                            color='primary'
                            className='w-full'
                            disabled={isPending}
                        >
                            {isPending ? <Loading /> : 'Register'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            <div className='mt-4'>
                <span className='text-ls'>Already have an account?</span>
                <Link
                    href='/login'
                    className='text-ls ml-4 text-blue-500'
                    prefetch={false}
                >
                    Login
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;

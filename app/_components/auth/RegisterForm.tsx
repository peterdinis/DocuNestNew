'use client';

import Link from 'next/link';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import useRegisterUser from '@/app/_hooks/users/useRegisterUser';
import { registerSchema } from './authSchema';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardFooter, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RegisterUser } from '@/app/_store/mutations/authMutations';

const RegisterForm: FC = () => {
    const [isVisible, setIsVisible] = useState(false);

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
                    reset(); // Reset the form after successful registration
                },
                onError: (error) => {
                    console.error('Registration error:', error);
                    // Optionally handle the error by displaying a message
                },
            });
        } catch (err) {
            console.error('Unexpected error:', err);
        }
    };

    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <Card className='w-full max-w-md'>
                <CardHeader className='text-center text-2xl'>Register</CardHeader>
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
                                <p className='font-bold text-red-600'>Name is required</p>
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
                                <p className='font-bold text-red-600'>Email is required</p>
                            )}
                        </div>

                        <div className='space-y-2 relative'>
                            <div>Password</div>
                            <Input
                                id='password'
                                placeholder='Enter your password'
                                {...register('password')}
                                type={isVisible ? 'text' : 'password'}
                            />
                            <button
                                type='button'
                                onClick={toggleVisibility}
                                className='absolute inset-y-0 right-0 flex mt-5 items-center px-2'
                            >
                                {isVisible ? (
                                    <EyeOff className='h-5 w-5' />
                                ) : (
                                    <Eye className='h-5 w-5' />
                                )}
                            </button>
                            {errors.password && (
                                <p className='font-bold text-red-600'>Password is required</p>
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
                            {isPending ? 'Registering...' : 'Register'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            <div className='mt-4'>
                <span className='text-sm'>Already have an account?</span>
                <Link href='/login' className='ml-4 text-sm text-blue-500' prefetch={false}>
                    Login
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;
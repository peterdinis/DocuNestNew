'use client';

import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { loginSchema } from './authSchema';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardFooter,
    CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const LoginForm: FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { toast } = useToast();
    const toggleVisibility = () => setIsVisible(!isVisible);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const loginUser = async (data: FieldValues) => {
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (result?.error) {
                toast({
                    title: 'Login error: ' + result.error,
                    duration: 2000,
                    className: 'bg-red-800 text-white font-bold',
                });
            } else {
                toast({
                    title: 'Login successful',
                    duration: 2000,
                    className: 'bg-green-800 text-white font-bold',
                });
                router.push('/dashboard');
            }
        } catch (error) {
            toast({
                title: 'Unexpected error',
                duration: 2000,
                className: 'bg-red-800 text-white font-bold',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <Card className='w-full max-w-md'>
                <CardHeader className='text-center text-2xl'>Login</CardHeader>
                <form onSubmit={handleSubmit(loginUser)}>
                    <CardContent className='space-y-4'>
                        <div className='space-y-2'>
                            <div>Email</div>
                            <Input
                                id='email'
                                type='email'
                                placeholder='m@example.com'
                                required
                                disabled={loading}
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className='font-bold text-red-600'>
                                    {errors.email.message as ReactNode}
                                </p>
                            )}
                        </div>
                        <div className='relative space-y-2'>
                            <div>Password</div>
                            <Input
                                id='password'
                                placeholder='Enter your password'
                                {...register('password')}
                                disabled={loading}
                                type={isVisible ? 'text' : 'password'}
                            />
                            <button
                                type='button'
                                onClick={toggleVisibility}
                                className='absolute inset-y-0 right-3 top-9 flex items-center'
                                tabIndex={-1} // Prevents button from interfering with form focus
                            >
                                {isVisible ? (
                                    <EyeOff className='h-5 w-5 text-gray-500' />
                                ) : (
                                    <Eye className='h-5 w-5 text-gray-500' />
                                )}
                            </button>
                            {errors.password && (
                                <p className='font-bold text-red-600'>
                                    {errors.password.message as ReactNode}
                                </p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className='flex flex-col space-y-2'>
                        <Button
                            type='submit'
                            color='primary'
                            className='w-full'
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className='h-8 w-8 animate-spin' />
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            <div className='mt-4'>
                <span className='text-sm'>Do not have an account? </span>
                <Link
                    href='/register'
                    className='ml-4 text-sm text-blue-500'
                    prefetch={false}
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;

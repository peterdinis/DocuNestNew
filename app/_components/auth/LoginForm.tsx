'use client';

import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { loginSchema } from './authSchema';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardFooter,
    CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Loading from '../shared/Loading';
import { useToast } from '@/app/_hooks/shared/use-toast';

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
                                    className='absolute right-3 mt-5 -translate-y-1/2 transform'
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
                            disabled={loading}
                        >
                            {loading ? <Loading /> : 'Login'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            <div className='mt-4'>
                <span className='text-ls'>Do not have an account? </span>
                <Link
                    href='/register'
                    className='text-ls ml-4 text-blue-500'
                    prefetch={false}
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;

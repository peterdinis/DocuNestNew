import { BackgroundBeamsWithCollision } from "@/components/background-beams";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import Link from "next/link";

const HomeWrapper: FC = () => {
  return (
    <>
      <BackgroundBeamsWithCollision>
      <div className='text-center'>
                <h2 className='relative z-20 text-center font-sans text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl lg:text-7xl'>
                    <div className='relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]'>
                        <div className='relative bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 bg-clip-text bg-no-repeat py-4 text-transparent'>
                            <span>Docu Nest</span>
                        </div>
                    </div>
                </h2>
                <p className='prose-p: prose mt-4 text-lg text-gray-800 dark:text-gray-300 md:text-xl lg:text-2xl'>
                    <span>
                        Your one-stop solution for seamless teamwork and project
                        management. Connect, collaborate, and create with ease.
                    </span>
                </p>
                <div className='flex justify-center align-top mt-5'>
                    <Button variant={"default"} size='lg' color='primary'>
                        <Link href='/register'>Try now</Link>
                    </Button>
                    <Button
                        variant={"secondary"}
                        size='lg'
                        color='secondary'
                        className='ml-4'
                    >
                        Pricing
                    </Button>
                </div>
            </div>
      </BackgroundBeamsWithCollision>
    </>
  );
};

export default HomeWrapper;

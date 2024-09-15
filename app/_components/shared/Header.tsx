import { FC } from 'react';

interface IHeaderProps {
    text: string;
}

const Header: FC<IHeaderProps> = ({ text }: IHeaderProps) => {
    return (
        <h2 className='prose-h2: prose scroll-m-20 text-4xl font-bold dark:text-white'>
            {text}
        </h2>
    );
};

export default Header;

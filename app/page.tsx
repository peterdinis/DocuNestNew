import { NextPage } from 'next';
import HomeWrapper from './_components/home/HomeWrapper';
import HeroServices from './_components/home/HomeServices';
import Footer from './_components/shared/Footer';

const Homepage: NextPage = () => {
    return (
        <>
            <HomeWrapper />
            <HeroServices />
            <Footer />
        </>
    );
};

export default Homepage;

import { NextPage } from "next";
import HomeWrapper from "./_components/home/HomeWrapper";
import HeroServices from "./_components/home/HomeServices";

const Homepage: NextPage = () => {
  return (
    <>
      <HomeWrapper />
      <HeroServices />
    </>
  )
};

export default Homepage;

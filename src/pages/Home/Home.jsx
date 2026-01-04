import React from 'react';
import Banner from '../../components/Banner';
import Overview from '../../components/Overview';
import SmartFinance from '../../components/SmartFinance';
import useTitle from '../../Hooks/useTitle';
import Features from '../../components/Features';
import Statistics from '../../components/Statistics';
import Highlights from '../../components/Highlights';
import Testimonials from '../../components/Testimonials';
import FAQ from '../../components/FAQ';
import Newsletter from '../../components/Newsletter';
import CTA from '../../components/CTA';

const Home = () => {
    useTitle("Home")
    return (
        <div>
            <Banner></Banner>
            <Overview></Overview>
            <SmartFinance></SmartFinance>
            <Features></Features>
            <Statistics></Statistics>
            <Highlights></Highlights>
            <Testimonials></Testimonials>
            <FAQ></FAQ>
            <Newsletter></Newsletter>
            <CTA></CTA>
        </div>
    );
};

export default Home;
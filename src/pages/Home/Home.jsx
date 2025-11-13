import React from 'react';
import Banner from '../../components/Banner';
import Overview from '../../components/Overview';
import SmartFinance from '../../components/SmartFinance';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Overview></Overview>
            <SmartFinance></SmartFinance>
        </div>
    );
};

export default Home;
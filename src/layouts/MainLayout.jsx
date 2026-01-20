import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div className='min-h-screen bg-[#f3efea]'>
            <nav>
                <Navbar></Navbar>
            </nav>
            <div className='h-16'></div>
            <main className='flex-grow px-4 md:px-10 py-10 mx-auto'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>

            <Toaster></Toaster>
        </div>
    );
};

export default MainLayout;
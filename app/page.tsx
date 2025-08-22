'use client';

import React from 'react';

import Footer from '../components/Footer';
import IdeaProcess from '../components/IdeaProcess';
import Main from '../components/Main';
import Navbar from '../components/Navbar';
import NewsLetter from '../components/NewsLetter';
import PurposeSection from '../components/PurposeSection';
import Testimonial from '../components/Testimonial';

const HomePage: React.FC = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <Navbar />
        <Main />
        <PurposeSection />
        <IdeaProcess />
        <Testimonial />
        <NewsLetter />
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;

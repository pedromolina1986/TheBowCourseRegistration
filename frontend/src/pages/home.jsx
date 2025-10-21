import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import Programs from '../components/Programs.jsx';
import Courses from '../components/Courses.jsx';
import TermOptions from '../components/TermOptions.jsx';
import CTA from '../components/CTA.jsx';
import Footer from '../components/Footer.jsx';
import WrapContainer from '../components/WrapContainer.jsx';

export default function Home() {
  return (
    <WrapContainer>
      <Header />
      <Hero />
      <Programs />
      <Courses />
      <TermOptions />
      <CTA />
      <Footer />
    </WrapContainer>
  );
}
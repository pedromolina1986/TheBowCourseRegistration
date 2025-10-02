import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Programs from '../components/Programs';
import Courses from '../components/Courses';
import TermOptions from '../components/TermOptions.jsx';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Programs />
      <Courses />
      <TermOptions />
      <CTA />
      <Footer />
    </div>
  );
}
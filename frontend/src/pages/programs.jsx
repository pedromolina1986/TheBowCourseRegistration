import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ProgramsPage from '../components/AllPrograms.jsx';

export default function Programs() {
    return(
        <div className="min-h-screen bg-white">
            <Header />
            <ProgramsPage />
            <Footer />
        </div>
    )
}
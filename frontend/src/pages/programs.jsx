import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ProgramsPage from '../components/AllPrograms.jsx';
import WrapContainer from '../components/WrapContainer.jsx';

export default function Programs() {
    return(
        <WrapContainer>
            <Header />
            <ProgramsPage />
            <Footer />
        </WrapContainer>
    )
}
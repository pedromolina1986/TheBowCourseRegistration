import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import AllCourses from '../components/AllCourses.jsx';
import WrapContainer from '../components/WrapContainer.jsx';

export default function Programs() {
    return(
        <WrapContainer>
                <Header />
            <AllCourses />
            <Footer />
        </WrapContainer>
    )
}
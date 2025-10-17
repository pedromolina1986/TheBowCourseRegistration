import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import AllCourses from '../components/AllCourses.jsx';

export default function Programs() {
    return(
        <div className="min-h-screen bg-white">
            <Header />
            <AllCourses />
            <Footer />
        </div>
    )
}
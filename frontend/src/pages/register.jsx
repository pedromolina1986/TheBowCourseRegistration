import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import RegisterForm from '../components/RegisterForm.jsx';
import Footer from '../components/Footer.jsx';


export default function Register() {

    return(
        <div className="min-h-screen bg-white">
            <Header />
            <RegisterForm />
            <Footer />
        </div>
    )
}
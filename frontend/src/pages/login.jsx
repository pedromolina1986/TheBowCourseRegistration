import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import LoginForm from '../components/LoginForm.jsx';
import Footer from '../components/Footer.jsx';

export default function Login() {


    return(
        <div className="min-h-screen bg-white">
            <Header />
            <LoginForm />
            <Footer />
        </div>
    )
}
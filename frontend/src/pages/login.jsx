import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import LoginForm from '../components/LoginForm.jsx';
import Footer from '../components/Footer.jsx';
import WrapContainer from '../components/WrapContainer.jsx';

export default function Login() {


    return(
        <WrapContainer>
            <Header />
            <LoginForm />
            <Footer />
        </WrapContainer>
    )
}
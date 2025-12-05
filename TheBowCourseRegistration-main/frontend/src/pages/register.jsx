import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import RegisterForm from '../components/RegisterForm.jsx';
import Footer from '../components/Footer.jsx';
import WrapContainer from '../components/WrapContainer.jsx';


export default function Register() {

    return(
        <WrapContainer>
            <Header />
            <RegisterForm />
            <Footer />
        </WrapContainer>
    )
}
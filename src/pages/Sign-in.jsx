import React from 'react';
import Header from '../components/Header';
import SignInForm from '../components/SignInForm';
import Footer from '../components/Footer';

function SignIn() {
  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <SignInForm />
      </main>
      <Footer />
    </div>
  );
}

export default SignIn;

import React from 'react';
import Header from '../components/Header';
import UserInfo from '../components/UserInfo';
import Account from '../components/Account';
import Footer from '../components/Footer';

function User() {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');

  return (
    <div>
      <Header username={username} />
      <main className="main bg-dark">
        <UserInfo />
        <h2 className="sr-only">Accounts</h2>
        <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
        <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
        <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
      </main>
      <Footer />
    </div>
  );
}

export default User;

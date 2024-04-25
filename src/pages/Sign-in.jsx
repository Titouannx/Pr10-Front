import React from 'react';
import Header from '../components/Header';
import SignInForm from '../components/SignInForm';
import Footer from '../components/Footer';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from "../slices/auth";

function SignIn() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (user) {
    return <Navigate to="/user" />;
  }
  
  return (
    <div>
      {user ? (
        <Header username={(user.firstName || '') + " " + (user.lastName || '')} />
        ) : (
          <Header />
      )}
      <main className="main bg-dark">
        <SignInForm />
      </main>
      <Footer />
    </div>
  );
}

export default SignIn;

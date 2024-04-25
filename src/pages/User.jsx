import Header from '../components/Header';
import UserInfo from '../components/UserInfo';
import Account from '../components/Account';
import Footer from '../components/Footer';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from "../slices/auth";

function User() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div>
      {user ? (
        <Header username={(user.firstName || '') + " " + (user.lastName || '')} />
        ) : (
          <Header />
      )}
      <main className="main bg-dark">
        <UserInfo username={(user ? (user.firstName || '') + " " + (user.lastName || '') : '')} />
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

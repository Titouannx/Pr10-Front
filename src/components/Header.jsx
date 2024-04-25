import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/argentBankLogo.png';
import AuthService from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/auth';

function Header({ username }) {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {username ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {username}
            </Link>
            <Link onClick={handleSignOut} className="main-nav-item" to="/">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;

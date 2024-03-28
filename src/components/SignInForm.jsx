import React from 'react';

function SignInForm() {
  const handleSignIn = () => {
    const username = document.getElementById('username').value;
    window.location.href = `/user?username=${username}`;
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="button" className="sign-in-button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </section>
  );
}

export default SignInForm;

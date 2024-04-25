import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { login, fetchUserProfile } from "../slices/auth"
import { clearMessage } from "../slices/message";

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleLogin = () => {
    setLoading(true);
  
    dispatch(login({ username, password, rememberMe }))
      .unwrap()
      .then(() => {
        dispatch(fetchUserProfile())
          .unwrap()
          .then(() => {
            navigate("/user");
          });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="sign-in-button"
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>
        </div>
      </form>

      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;

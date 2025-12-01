import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import './Auth.css';

const Login = ({ onLoginSuccess, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err) {
      // Safe error message for security
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Incorrect email or password. Please try again.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many login attempts. Please try again later.');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      // Force account chooser so users can pick which Google account to use
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
      onLoginSuccess();
    } catch (err) {
      if (err.code === 'auth/account-exists-with-different-credential') {
        setError('An account with the same email exists with a different sign-in method. Please use that provider or sign in with email/password.');
      } else {
        setError('Google login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');
      // Attempt to show account selection where supported
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
      onLoginSuccess();
    } catch (err) {
      if (err.code === 'auth/account-exists-with-different-credential') {
        setError('An account with the same email exists with a different sign-in method. Please use that provider or sign in with email/password.');
      } else {
        setError('Apple login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new OAuthProvider('microsoft.com');
      provider.setCustomParameters({
        tenant: 'common',
        prompt: 'select_account',
      });
      await signInWithPopup(auth, provider);
      onLoginSuccess();
    } catch (err) {
      if (err.code === 'auth/account-exists-with-different-credential') {
        setError('An account with the same email exists with a different sign-in method. Please use that provider or sign in with email/password.');
      } else {
        setError('Microsoft login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>✝️ FaithGPT</h1>
          <p>Welcome Back</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleEmailLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="auth-button primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="auth-divider">or continue with</div>

        <div className="auth-social-buttons">
          <button
            type="button"
            className="social-button google"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Google
          </button>
          <button
            type="button"
            className="social-button apple"
            onClick={handleAppleLogin}
            disabled={loading}
          >
            Apple
          </button>
          <button
            type="button"
            className="social-button microsoft"
            onClick={handleMicrosoftLogin}
            disabled={loading}
          >
            Microsoft
          </button>
        </div>

        <div className="auth-footer">
          <p>Don't have an account? <button type="button" className="link-button" onClick={onSwitchToSignUp}>Sign up</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

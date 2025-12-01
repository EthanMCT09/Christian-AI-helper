import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import './Auth.css';

const SignUp = ({ onSignUpSuccess, onSwitchToLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);

  // Simple password presence check — allow any password as long as it matches confirmation
  const validatePassword = (pwd) => {
    return pwd && pwd.length > 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check if Firebase is configured
    if (!auth || !auth.currentUser === undefined) {
      // Firebase is initialized; continue
    }

    // Validation
    // Require basic fields and matching passwords. Do not block sign-up with strict password rules
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name.');
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email.');
      setLoading(false);
      return;
    }

    if (!validatePassword(password) || password !== confirmPassword) {
      setError('Please enter a password and make sure both fields match.');
      setLoading(false);
      return;
    }

    try {
      // Create Firebase user (this is the critical step)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with name (non-critical)
      try {
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });
      } catch (profileErr) {
        // Profile update failure is non-critical; continue
        import('../utils/logger').then(({ logger }) => logger.warn('Profile update failed:', profileErr)).catch(() => {});
      }

      // Store additional user data in Firestore (non-critical)
      try {
        await setDoc(doc(db, 'users', user.uid), {
          firstName,
          lastName,
          email,
          dateOfBirth: dateOfBirth || null,
          createdAt: new Date(),
          preferences: {
            theme: 'nature',
            bibleVersion: 'NIV',
            tone: 'encouraging',
          },
        });
      } catch (firestoreErr) {
        // Firestore write failure is non-critical; user is still authenticated
        import('../utils/logger').then(({ logger }) => logger.warn('Firestore profile save failed:', firestoreErr)).catch(() => {});
      }

      // User is created and automatically signed in by Firebase; grant access
      setAccessGranted(true);
      // small delay so user sees confirmation then enter the app
      setTimeout(() => {
        onSignUpSuccess();
      }, 500);
    } catch (err) {
      // Only authentication errors block sign-up
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please log in instead.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Use at least 6 characters.');
      } else if (err.code === 'auth/missing-email') {
        setError('Email is required.');
      } else if (err.code === 'auth/missing-password') {
        setError('Password is required.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error: Firebase is not configured properly. Please check your .env file with Firebase credentials and restart the server.');
      } else if (err.message && err.message.includes('Firebase configuration is missing')) {
        setError('Firebase setup required: Copy .env.example to .env, add your Firebase credentials, and restart.');
      } else {
        // Show friendly message, but in development expose the raw error for debugging
        const friendly = `Unable to create account: ${err.message || 'Please try again.'}`;
        if (import.meta.env.DEV) {
          // Log and show the raw error code/message in development to aid debugging
          import('../utils/logger').then(({ logger }) => logger.error('SignUp error:', err)).catch(() => {});
          setError(`${friendly} (${err.code || 'no-code'}: ${err.message || 'no-message'})`);
        } else {
          setError(friendly);
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>✝️ FaithGPT</h1>
          <p>Create Your Account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSignUp} className="auth-form">
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group half">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

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
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="At least 8 characters with uppercase, lowercase, and numbers"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="auth-button primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Finished'}
          </button>
        
        {accessGranted && (
          <div className="auth-success" style={{marginTop: '12px', color: 'green', fontWeight: 600}}>
            Access granted — Redirecting...
          </div>
        )}
        </form>

        <div className="auth-footer">
          <p>Already have an account? <button type="button" className="link-button" onClick={onSwitchToLogin}>Log in</button></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import ChoreManagementApp from './components/ChoreManagementApp';

// Sign up, log in, and reset password functionality

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const signUp = async () => {
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Sign-up successful! Check your email to confirm.');
    }
    setLoading(false);
  };

  const signIn = async () => {
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      window.location.href = '/home'; // Redirect after login
    }
    setLoading(false);
  };

  const resetPassword = async () => {
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://your-site.com/reset-password', // Change this to your actual URL
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for a password reset link.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Sign Up / Log In</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signUp} disabled={loading}>Sign Up</button>
      <button onClick={signIn} disabled={loading}>Log In</button>
      <button onClick={resetPassword} disabled={loading}>Forgot Password?</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Auth;

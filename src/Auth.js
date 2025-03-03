import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import ChoreManagementApp from './components/ChoreManagementApp';

// Sign up, log in, and reset password functionality

const Auth = () => {
  // State to hold email, password, loading status, and message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Function to handle sign-up
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

  // Function to handle sign-in
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

  // Function to handle password reset
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
      {/* Input for email */}
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      {/* Input for password */}
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      {/* Button to trigger sign-up */}
      <button onClick={signUp} disabled={loading}>Sign Up</button>
      {/* Button to trigger sign-in */}
      <button onClick={signIn} disabled={loading}>Log In</button>
      {/* Button to trigger password reset */}
      <button onClick={resetPassword} disabled={loading}>Forgot Password?</button>
      {/* Display message if exists */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Auth;
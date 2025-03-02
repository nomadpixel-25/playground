import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const updatePassword = async () => {
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Password updated! You can now log in.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={updatePassword} disabled={loading}>Update Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Home from './Home';
import ResetPassword from './ResetPassword';

function App() {
  // State to hold the current session
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch the current session from Supabase on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Set up a listener for authentication state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Clean up the listener on component unmount
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirect to /home if session exists, otherwise show Auth component */}
        <Route path="/" element={session ? <Navigate to="/home" /> : <Auth />} />
        {/* Show Home component if session exists, otherwise redirect to / */}
        <Route path="/home" element={session ? <Home /> : <Navigate to="/" />} />
        {/* Always show ResetPassword component */}
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
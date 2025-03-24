import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Home from './Home';
import ResetPassword from './ResetPassword';
import ChoreManagementApp from './components/ChoreManagementApp'; // Import the ChoreManagementApp component

console.log('Auth component:', Auth);
console.log('Home component:', Home);
console.log('ResetPassword component:', ResetPassword);
console.log('IMPORTING ChoreManagementApp component:', ChoreManagementApp);

function App() {
  // State to hold the current session
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch the current session from Supabase on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log('APPJS01: User is logged in:', !!session); // Add this line
    });

    // Set up a listener for authentication state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log('APPJS02: User is logged in:', !!session); // Add this line
    });

    // Clean up the listener on component unmount
    return () => listener.subscription.unsubscribe();
  }, []);

  console.log('hello world'); // Add this line
  return (
    <Router>
      <Routes>
      <Route path="/playground" element={<ChoreManagementApp />} />
    </Routes>
    </Router>
    // <Router>
    //   <Routes>
    //     {/* Redirect to /home if session exists, otherwise show Auth component */}
    //     {/* <Route path="/" element={session ? <Navigate to="/home" /> : <Auth />} /> */}
    //     <Route path="/"/>
    //     {/* Show Home component if session exists, otherwise redirect to /
    //     <Route path="/home" element={session ? <Home /> : <Navigate to="/" />} />
    //     {/* Always show ResetPassword component */}
    //     {/* <Route path="/reset-password" element={<ResetPassword />} /> */} 
    //     {/* Add a route for /playground */}
    //     {/* <Route path="/playground" element={<ChoreManagementApp />} /> Correctly render ChoreManagementApp component */}
    //   </Routes>
    // </Router>
  );
}

export default App;
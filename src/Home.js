import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import ChoreManagementApp from './components/ChoreManagementApp';

console.log('ChoreManagementApp component:', ChoreManagementApp);

const Home = () => {
  // State to hold the current user
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the current session from Supabase on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user); // Set the user if session exists
        console.log('HOME: User is logged in:', session.user); // Add this line
      } else {
        console.log('No user session found, redirecting to login'); // Add this line
        window.location.href = '/'; // Redirect to login if not authenticated
      }
    });
  }, []);

  // Function to handle sign-out
  const signOut = async () => {
    await supabase.auth.signOut();
    console.log('User signed out'); // Add this line
    window.location.href = '/'; // Redirect to login page after logout
  };

  return (
    <div>
      <h1>Welcome {user?.email}!</h1> {/* Display the user's email */}
      <p>This is your main website content.</p>
      <button onClick={signOut}>Log Out</button> {/* Button to trigger sign-out */}
      <ChoreManagementApp />
    </div>
  );
};

export default Home;
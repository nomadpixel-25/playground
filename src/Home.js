import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      } else {
        window.location.href = '/'; // Redirect to login if not authenticated
      }
    });
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/'; // Redirect to login after sign out
  };

  return (
    <div>
      <h1>Welcome {user?.email}!</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default Home;
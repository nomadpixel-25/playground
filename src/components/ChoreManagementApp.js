import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import UserInput from './UserInput';
import UserManagement from './UserManagement';
import TaskInput from './TaskInput';
import TaskManagement from './TaskManagement';
import TaskAssignmentForm from './TaskAssignmentForm';
import TaskAssignmentTable from './TaskAssignmentTable';

// console.log('UserInput component:', UserInput);
// console.log('UserManagement component:', UserManagement);
// console.log('TaskInput component:', TaskInput);
// console.log('TaskManagement component:', TaskManagement);
// console.log('TaskAssignmentForm component:', TaskAssignmentForm);
// console.log('TaskAssignmentTable component:', TaskAssignmentTable);

const date = new Date();

function ChoreManagementApp() {
  // State to hold users, tasks, and task assignments
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskAssignments, setTaskAssignments] = useState([]);

  // Function to add a user to the users state
  const addUser = (user) => {
    setUsers([...users, user]);
  };
  
  // Function to add a task to the tasks state
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Function to add task assignments to the taskAssignments state
  const addTaskAssignment = (assignments) => {
    setTaskAssignments((prevAssignments) => [...prevAssignments, ...assignments]);
  };

  // State to hold the current session
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch the current session from Supabase on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log('CHOREMANAGEMENT APP 01: User is logged in:', !!session); // Add this line
    });
  
    // Set up a listener for authentication state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log('CHOREMANAGEMENT APP 02: User is logged in:', !!session); // Add this line
    });
  
    // Clean up the listener on component unmount
    return () => listener.subscription.unsubscribe();
  }, []);

  // Redirect to login page if the user is not logged in
  if (!session) {
    console.log('User is NOT logged in:', !!session); // Add this line
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Supabase Auth in React</h1>
      {/* Display a welcome message if the user is logged in */}
      {session ? <p>Welcome! You are logged in.</p> : null}
      <div>
        <h1 className="h1">Task Management</h1>
        <p>Welcome to the task management system</p>
        <p>Today is {date.toDateString()}</p>
        <div className="container">
          <div className="row">
            <h2>Add User and Task</h2>
            <p>Add a user and a task to the system</p>
          </div>
          
          <div className="row">
            <div className="col">
              {/* Component to add a user */}
              <UserInput addUser={addUser} />
            </div>
            <div className="col">
              {/* Component to add a task */}
              <TaskInput addTask={addTask} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              {/* Component to manage users */}
              <UserManagement users={users} />
            </div>
            <div className="col">
              {/* Component to manage tasks */}
              <TaskManagement tasks={tasks} />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 hidden>Assign Task</h2>
              <p hidden>Choose a user, task, and date to assign the task</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {/* Component to assign tasks */}
              <TaskAssignmentForm users={users} tasks={tasks} addTaskAssignment={addTaskAssignment} taskAssignments={taskAssignments} />
            </div>
          </div>
          <div className="container">
            {/* Component to display task assignments */}
            <TaskAssignmentTable taskAssignments={taskAssignments} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChoreManagementApp;
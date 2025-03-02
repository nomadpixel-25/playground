import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import UserInput from './UserInput';
import UserManagement from './UserManagement';
import TaskInput from './TaskInput';
import TaskManagement from './TaskManagement';
import TaskAssignmentForm from './TaskAssignmentForm';
import TaskAssignmentTable from './TaskAssignmentTable';

const date = new Date();

function ChoreManagementApp() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskAssignments, setTaskAssignments] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };
  
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const addTaskAssignment = (assignments) => {
    setTaskAssignments((prevAssignments) => [...prevAssignments, ...assignments]);
  };

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h1>Supabase Auth in React</h1>
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
              <UserInput addUser={addUser} />
            </div>
            <div className="col">
              <TaskInput addTask={addTask} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <UserManagement users={users} />
            </div>
            <div className="col">
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
              <TaskAssignmentForm users={users} tasks={tasks} addTaskAssignment={addTaskAssignment} taskAssignments={taskAssignments} />
            </div>
          </div>
          <div className="container">
            <TaskAssignmentTable taskAssignments={taskAssignments} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChoreManagementApp;
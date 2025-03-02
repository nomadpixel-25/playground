import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const users = {};
const date = new Date();
const tasksTitle = {};

function UserInput({ addUser }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addUser(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your name:
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}

function UserManagement({ users }) {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

function TaskInput({ addTask }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTask(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your task:
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}

function TaskManagement({ tasks }) {
  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}


function App() {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <h1>Task Management</h1>
      <p>Welcome to the task management system</p>
      <p>Today is {date.toDateString()}</p>
      <UserInput addUser={addUser} />
      <UserManagement users={users} />
      <TaskInput addTask={addTask} />
      <TaskManagement tasks={tasks} />

    </div>
  );
}


export {UserInput, UserManagement, TaskInput, TaskManagement }; 
export default App;


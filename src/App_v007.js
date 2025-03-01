import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const date = new Date();

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

function TaskAssignmentForm({ users, tasks, addTaskAssignment }) {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser && selectedTask && selectedDate) {
      addTaskAssignment({
        user: selectedUser,
        task: selectedTask,
        date: selectedDate.toDateString(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select User:
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="" disabled>Select a user</option>
          {users.map((user, index) => (
            <option key={index} value={user}>{user}</option>
          ))}
        </select>
      </label>
      <label>
        Select Task:
        <select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)}>
          <option value="" disabled>Select a task</option>
          {tasks.map((task, index) => (
            <option key={index} value={task}>{task}</option>
          ))}
        </select>
      </label>
      <label>
        Select Date:
        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
      </label>
      <button type="submit">Assign Task</button>
    </form>
  );
}

function TaskAssignmentTable({ taskAssignments }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Date</th>
          <th>Task</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {taskAssignments.map((assignment, index) => (
          <tr key={index}>
            <td>{assignment.date}</td>
            <td>{assignment.task}</td>
            <td>{assignment.user}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskAssignments, setTaskAssignments] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };
  
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const addTaskAssignment = (assignment) => {
    setTaskAssignments([...taskAssignments, assignment]);
  };

  return (
    <div>
      <h1>Task Management</h1>
      <p>Welcome to the task management system</p>
      <p>Today is {date.toDateString()}</p>
      <UserInput addUser={addUser} />
      <TaskInput addTask={addTask} />
      <UserManagement users={users} />
      <TaskManagement tasks={tasks} />
      <TaskAssignmentForm users={users} tasks={tasks} addTaskAssignment={addTaskAssignment} />
      <TaskAssignmentTable taskAssignments={taskAssignments} />
    </div>
  );
}

export { UserInput, UserManagement, TaskInput, TaskManagement, TaskAssignmentForm }; 
export default App;
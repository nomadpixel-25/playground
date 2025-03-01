
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
        Enter user name:
        <input class="form-control"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <button type="submit" className="btn btn-primary">Add</button>
    </form>
  );
}

function UserManagement({ users }) {
  return (
    <div hidden>
      <h5 class="h5">Users list</h5>
      <ul>
        {users.map((user, index) => (
          <li class="list-unstyled" key={index}>{user}</li>
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
        Enter task:
        <input class="form-control"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <button type="submit" className="btn btn-primary">Add</button>
    </form>
  );
}

function TaskManagement({ tasks }) {
  return (
    <div hidden>
      <h5 class="h5">Tasks</h5>
      <ul>
        {tasks.map((task, index) => (
          <li class="list-unstyled" key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

function TaskAssignmentForm({ users, tasks, addTaskAssignment, taskAssignments }) {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser && selectedTask && selectedDate) {
      const isTaskAssigned = taskAssignments.some(
        (assignment) => assignment.task === selectedTask && assignment.date === selectedDate.toDateString()
      );

      if (isTaskAssigned) {
        alert('This task is already assigned to another user on the selected date.');
      } else {
        addTaskAssignment({
          user: selectedUser,
          task: selectedTask,
          date: selectedDate.toDateString(),
        });
      }
    }
  };

  return (
    <div class="form-group">
      <form onSubmit={handleSubmit}>
        <div class="row">
        <div class="col">
        <label>
          <select class="form-select" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          {users.map((user, index) => (
            <option key={index} value={user}>{user}</option>
          ))}
          </select>
        </label>
        </div>
        <div class="col">

        <label>
          <select class="form-select" multiple value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)}>
          {tasks.map((task, index) => (
            <option key={index} value={task}>{task}</option>
          ))}
          </select>
        </label>
        </div>
        </div>
    
        <label>
          Select Date:
          <DatePicker className='form-control' selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
        </label>
        <button type="submit" class="btn btn-primary">Assign Task</button>
      </form>
    </div>
  );
}

function TaskAssignmentTable({ taskAssignments }) {
  return (
    <table class="table table-striped" border="1">
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
      <h1 class="h1">Task Management</h1>
      <p>Welcome to the task management system</p>
      <p>Today is {date.toDateString()}</p>
      <div class="container">
        <div class="row">
          <h2>Add User and Task</h2>
          <p>Add a user and a task to the system</p>
        </div>
        
        <div class="row">
          <div class="col">
            <UserInput addUser={addUser} />
          </div>
          <div class="col">
            <TaskInput addTask={addTask} />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <UserManagement users={users} />
          </div>
          <div class="col">
            <TaskManagement tasks={tasks} />
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col">
            <h2 hidden>Assign Task</h2>
            <p hidden>Choose a user, task, and date to assign the task</p>
          </div>
        </div>
        <div class="row">
          {/* date picker */}
          <div class="col">
            <TaskAssignmentForm users={users} tasks={tasks} addTaskAssignment={addTaskAssignment} taskAssignments={taskAssignments} />
          </div>
        </div>
        <div class="container">
          {/* <div class="col"> */}
            <TaskAssignmentTable taskAssignments={taskAssignments} />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export { UserInput, UserManagement, TaskInput, TaskManagement, TaskAssignmentForm }; 
export default App;
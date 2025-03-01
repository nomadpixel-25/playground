import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const user = [];
const date = new Date();
const tasksTitle = [];


// const tasks = [
//   { title: 'Bed time', id: 1, assignee: user, date: date },
//   { title: 'Bath time', id: 2, assignee: user, date: date },
//   { title: 'Pick up', id: 3, assignee: user, date: date },
//   { title: 'Drop-off', id: 4, assignee: user, date: date },
//   { title: 'Cooking', id: 5, assignee: user, date: date },
// ];

const listItems = tasks.map(task =>
  <li key={task.id}>
    {task.title} - {task.assignee.name} - {task.date.toDateString()}
  </li>
);

function TaskInput() {
  return (
    <form>
      <label>Create new task: 
        <input type="text" />
      </label>
      <button type="submit">Add</button >
    </form>
  )
}

function TaskManagement() {
  const title = 'Tasks';
    return (
      <div> 
      <h1>{title}</h1>
      <ul>{listItems}</ul>
      </div>
    );
};

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

function App() {
  return (
    <div>
      <h1>Task Management</h1>
      <p>Welcome to the task management system</p>
      <p>Today is {date.toDateString()}</p>
      <TaskInput />
      <TaskManagement />
      <MyButton />
    </div>
  );
}


export {TaskManagement, MyButton, TaskInput}; 
export default App;


import React, { useState } from 'react';

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
        <input className="form-control"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <button type="submit" className="btn btn-primary">Add</button>
    </form>
  );
}

export default TaskInput;
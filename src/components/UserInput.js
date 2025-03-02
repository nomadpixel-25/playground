import React, { useState } from 'react';

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

export default UserInput;
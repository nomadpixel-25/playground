import React from 'react';

function TaskManagement({ tasks }) {
  return (
    <div hidden>
      <h5 className="h5">Tasks</h5>
      <ul>
        {tasks.map((task, index) => (
          <li className="list-unstyled" key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManagement;
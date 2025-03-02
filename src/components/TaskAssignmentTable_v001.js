import React from 'react';

function TaskAssignmentTable({ taskAssignments }) {
  return (
    <table className="table table-striped" border="1">
      <thead>
        <tr>
          <th>Date</th>
          <th>Task</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {taskAssignments.map((assignment, index) => {
          return assignment.task.map((task, taskIndex) => (
            <tr key={`${index}-${taskIndex}`}>
              <td>{assignment.date}</td>
              <td>{task}</td>
              <td>{assignment.user}</td>
            </tr>
          ));
        })}
      </tbody>
    </table>
  );
}

export default TaskAssignmentTable;
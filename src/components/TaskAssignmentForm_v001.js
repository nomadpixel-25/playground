import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// TaskAssignmentForm component definition
function TaskAssignmentForm({ users, tasks, addTaskAssignment, taskAssignments }) {
  // State hooks for managing selected user, tasks, and date
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Handler for task selection change
  const handleTaskChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedTasks(selected);
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
        
    // Check if all required fields are filled
    if (selectedUser && selectedTasks.length > 0 && selectedDate) {
      // Create new assignments based on selected tasks
      const newAssignments = selectedTasks.map((task) => ({
        user: selectedUser,
        task: task,
        date: selectedDate.toDateString(),
      }));

      // Filter out assignments that are already assigned
      const validAssignments = newAssignments.filter((assignment) => {
        const isTaskAssigned = taskAssignments.some(
          (existingAssignment) => existingAssignment.task === assignment.task && existingAssignment.date === assignment.date
        );
        if (isTaskAssigned) {
          alert(`The task "${assignment.task}" is already assigned to another user on the selected date.`);
          return false;
        }
        return true;
      });

      // Add valid assignments to the task assignments list
      if (validAssignments.length > 0) {
        validAssignments.forEach((assignment) => {
          addTaskAssignment((prevAssignments) => [...prevAssignments, assignment]);
        });
      }
    }
  };

  // Render the form
  return (
    <div className="form-group">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label>
              Select User:
              <select className="form-select" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                <option value="">Select a user</option>
                {users.map((user, index) => (
                  <option key={index} value={user}>{user}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="col">
            <label>
              Select Tasks:
              <select className="form-select" multiple value={selectedTasks} onChange={handleTaskChange}>
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
        <button type="submit" className="btn btn-primary">Assign Task</button>
      </form>
    </div>
  );
}

// Export the TaskAssignmentForm component
export default TaskAssignmentForm;
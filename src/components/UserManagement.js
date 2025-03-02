import React from 'react';

function UserManagement({ users }) {
  return (
    <div hidden>
      <h5 className="h5">Users list</h5>
      <ul>
        {users.map((user, index) => (
          <li className="list-unstyled" key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../slices/auth';
import { fetchUserProfile } from "../slices/auth";

function UserInfo({ username }) {
  const [firstName, lastName] = username.split(" ");
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    dispatch(updateUserProfile({ firstName: newFirstName, lastName: newLastName }));
    dispatch(fetchUserProfile());
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewFirstName(firstName);
    setNewLastName(lastName);
  };

  return (
    <section>
      {isEditing ? (
        <div className="header">
          <h1>Welcome back<br /></h1>
          <input
            type="text"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
            placeholder={firstName}
          />
          <input
            type="text"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
            placeholder={lastName}
          />
          <div>
            <button className="update-button" onClick={handleSave}>Save</button>
            <button className="update-button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="header">
          <h1>Welcome back<br />{username} !</h1>
          <button className="edit-button" onClick={handleEdit}>Edit Name</button>
        </div>
      )}
    </section>
  );
}

export default UserInfo;

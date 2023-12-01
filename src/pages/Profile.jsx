import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Context/auth.context';
import axios from 'axios';


const API_URL = "http://localhost:5005";

function ProfilePage() {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [birthday, setBirthday] = useState("");
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    // Load the current user's information when the component mounts
    if (user) {
      setName(user.name || "");
      setPicture(user.picture || "");
      setBirthday(user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : ""); // Format birthday as YYYY-MM-DD
    }
  }, [user]);
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');

    axios.put(`${API_URL}/user/edit-profile`, { name, picture, birthday }, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(response => {

      setUser({ ...user, name, picture, birthday });
      console.log('Profile updated:', response.data);
    })
    .catch(error => {
      if (error.response) {

        console.error('Error updating profile:', error.response.data);
      } else if (error.request) {
  
        console.error('Error updating profile: No response received', error.request);
      } else {

        console.error('Error updating profile:', error.message);
      }
    });
    
  };

  return (
    <div className='main-profile-page'>
    <div className="profile-container">
    <h1>Profile Page</h1>
    <div className="user-info">
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Birthday:</strong> {user?.birthday}</p>
      <p><strong>Picture:</strong> {user?.picture ? <img src={user.picture} alt="User" /> : 'No picture'}</p>
    </div>

    <form onSubmit={handleFormSubmit} className="profile-form">
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />

      <label htmlFor="birthday">Birthday:</label>
      <input id="birthday" type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />


      <label htmlFor="picture">Picture URL:</label>
      <input id="picture" type="text" value={picture} onChange={e => setPicture(e.target.value)} />

      
      <button type="submit">Save Changes</button>
    </form>
  </div>
  </div>
);
}

export default ProfilePage;

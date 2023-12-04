import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Context/auth.context';
import axios from 'axios';
import "../pages/Profile.css";

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
    <div className='profile-main'>
    <div className="profile-content">
      <div className="profile-header">
        <h1 className="profile-title">Profile Page</h1>
      </div>
        <div className="profile-info">
            <p className="profile-info-item"><strong>Email:</strong> {user?.email}</p>
            <p className="profile-info-item"><strong>Name:</strong> {user?.name}</p>
            <p className="profile-info-item"><strong>Birthday:</strong> {user?.birthday}</p>
            <p className="profile-info-item">{user?.picture ? <img src={user.picture} alt="User" width="50px" className="profile-picture" /> : 'No picture'}</p>
        </div>

        <form onSubmit={handleFormSubmit} className="profile-form">
            <div className="form-group">
                <label htmlFor="name" className="form-label">Name:</label>
                <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="form-input" />
            </div>

            <div className="form-group">
                <label htmlFor="birthday" className="form-label">Birthday:</label>
                <input id="birthday" type="date" value={birthday} onChange={e => setBirthday(e.target.value)} className="form-input" />
            </div>

            <div className="form-group">
                <label htmlFor="picture" className="form-label">Picture URL:</label>
                <input id="picture" type="text" value={picture} onChange={e => setPicture(e.target.value)} className="form-input" />
            </div>

            <button type="submit" className="form-button">Save Changes</button>
        </form>
    </div>
</div>

);
}

export default ProfilePage;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../pages/AddcrewPage.css";

const API_URL = "https://dm-airlines.adaptable.app";

const AddCrewPage = () => {
  const [crewMember, setCrewMember] = useState({
    name: '',
    role: 'Pilot', // default value
    status: 'Active' // default value
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCrewMember({ ...crewMember, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/api/crews`, crewMember)
      .then((response) => {
        navigate(`/crews/${response.data.crewId}`);
      })
      .catch(error => {
        console.log(error);
      });
};

  return (
    <div className='main-add-container'>
    <div className="add-crew-container">
  <h1 className="add-crew-title">Add Crew Member</h1>
  <form onSubmit={handleSubmit} className="add-crew-form">
    
    <div className="form-group">
      <input type="text" name="name" value={crewMember.name} onChange={handleChange} placeholder="Name" className="form-control" />
    </div>

    <div className="form-group">
      <select name="role" value={crewMember.role} onChange={handleChange} className="form-control">
        <option value="Pilot">Pilot</option>
        <option value="Co-Pilot">Co-Pilot</option>
        <option value="Flight Attendant">Flight Attendant</option>
        <option value="Engineer">Engineer</option>
      </select>
    </div>

    <div className="form-group">
      <select name="status" value={crewMember.status} onChange={handleChange} className="form-control">
        <option value="Active">Active</option>
        <option value="On Leave">On Leave</option>
        <option value="Retired">Retired</option>
      </select>
    </div>

    <button type="submit" className="add-crew-button">Add Crew Member</button>
  </form>
</div>
</div>

  );
};

export default AddCrewPage;

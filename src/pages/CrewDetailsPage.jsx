import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5005";

const CrewDetailsPage = () => {
  const [crewMember, setCrewMember] = useState({
    name: '',
    birthday: '',
    email: '',
    phone: '',
    typerating: [],
    license: '',
    role: '',
    status: '',
    profilePicture: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState('');
  const { crewId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/crews/${crewId}`)
      .then(response => {
        const formattedData = {
          ...response.data,
          birthday: response.data.birthday ? response.data.birthday.split('T')[0] : '',
          license: response.data.license ? response.data.license.split('T')[0] : '',
          typerating: response.data.typerating ? response.data.typerating.split(',') : []
        };
        setCrewMember(formattedData);
      })
      .catch(() => {
        setError('Failed to fetch crew member details');
      });
  }, [crewId]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleUpdate = () => {
    const updatedCrewMember = {
      ...crewMember,
      typerating: crewMember.typerating.join(',')
    };

    axios.put(`${API_URL}/api/crews/${crewId}`, updatedCrewMember)
      .then(() => {
        alert("Crew member updated successfully!");
        navigate('/crews');
      })
      .catch(error => {
        console.error("Error updating crew member:", error);
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this crew member?");
    if (confirmDelete) {
      axios.delete(`${API_URL}/api/crews/${crewId}`)
        .then(() => {
          alert("Crew member deleted successfully!");
          navigate('/crews');
        })
        .catch(error => {
          console.error("Error deleting crew member:", error);
        });
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'typerating') {
      const newRatings = [...crewMember.typerating];
      if (e.target.checked) {
        newRatings.push(e.target.value);
      } else {
        const index = newRatings.indexOf(e.target.value);
        
          newRatings.splice(index, 1);
        
      }
      setCrewMember({ ...crewMember, typerating: newRatings });
    } else {
      setCrewMember({ ...crewMember, [e.target.name]: e.target.value });
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!crewMember) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="crew-details-main">
      <div className="crew-header">
        <h1 className="crew-header-title">{crewMember.name}'s Details</h1>
        <button className="crew-header-button" onClick={toggleEditMode}>
          {isEditMode ? 'Cancel Editing' : 'Edit Profile'}
        </button>
      </div>

      <div className="crew-content">
        {isEditMode ? (
          <div className="crew-form">
            <label className="crew-form-label">Profile Picture URL:</label>
            <input
              className="crew-form-input"
              type="text"
              name="profilePicture"
              value={crewMember.profilePicture}
              onChange={handleChange}
            />
            <label className="crew-form-label">Full Name:</label>
            <input className="crew-form-input" type="text" name="name" value={crewMember.name} onChange={handleChange} />

            <label className="crew-form-label">Birthday:</label>
            <input className="crew-form-input" type="date" name="birthday" value={crewMember.birthday} onChange={handleChange} />

            <label className="crew-form-label">Email:</label>
            <input className="crew-form-input" type="text" name="email" value={crewMember.email} onChange={handleChange} />

            <label className="crew-form-label">Phone Number:</label>
            <input className="crew-form-input" type="text" name="phone" value={crewMember.phone} onChange={handleChange} />

            <label className="crew-form-label">Type Rating:</label>
            <div className="crew-form-checkbox-group">
              {['A319/320/321', 'A330', 'A350'].map((rating) => (
                <div key={rating}>
                  <input
                    type="checkbox"
                    name="typerating"
                    value={rating}
                    checked={crewMember.typerating.includes(rating)}
                    onChange={handleChange}
                  />
                  <label>{rating}</label>
                </div>
              ))}
            </div>

            <label className="crew-form-label">License Expiry Date:</label>
            <input className="crew-form-input" type="date" name="license" value={crewMember.license} onChange={handleChange} />

            <label className="crew-form-label">Role:</label>
            <select className="crew-form-select" name="role" value={crewMember.role} onChange={handleChange}>
              <option value="Pilot">Pilot</option>
              <option value="Co-Pilot">Co-Pilot</option>
              <option value="Flight Attendant">Flight Attendant</option>
              <option value="Engineer">Engineer</option>
            </select>

            <label className="crew-form-label">Status:</label>
            <select className="crew-form-select" name="status" value={crewMember.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Retired">Retired</option>
            </select>

            <div className='crew-action-buttons'>
              <button className="crew-update-button" onClick={handleUpdate}>Update Crew Member</button>
              <button className="crew-delete-button" onClick={handleDelete}>Delete Crew Member</button>
            </div>
          </div>
        ) : (
          <div className="crew-display">
            <div className="crew-profile-picture">
                <img src={crewMember.profilePicture} alt={`${crewMember.name}'s Profile Image`} />
              </div>
            <p className="crew-display-item"><b>Full Name:</b> {crewMember.name}</p>
            <p className="crew-display-item"><b>Birthday:</b> {crewMember.birthday}</p>
            <p className="crew-display-item"><b>Email:</b> {crewMember.email}</p>
            <p className="crew-display-item"><b>Phone Number:</b> {crewMember.phone}</p>
            <p className="crew-display-item"><b>Type Rating:</b> {crewMember.typerating.join(', ')}</p>
            <p className="crew-display-item"><b>License Expiry Date:</b> {crewMember.license}</p>
            <p className="crew-display-item"><b>Role:</b> {crewMember.role}</p>
            <p className="crew-display-item"><b>Status:</b> {crewMember.status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrewDetailsPage;

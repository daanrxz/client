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
    typerating: '',
    license: '',
    role: '',
    status: ''
  });
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
        };
        setCrewMember(formattedData);
      })
      .catch(error => {
        setError('Failed to fetch crew member details');
      });
  }, [crewId]);

  const handleUpdate = () => {
    axios.put(`${API_URL}/api/crews/${crewId}`, crewMember)
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

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

  };

  const handleChange = (e) => {
    setCrewMember({ ...crewMember, [e.target.name]: e.target.value });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!crewMember) {
    return <div>Loading...</div>;
  }

  return (
    <div className="crew-details-container">
      <h1>Crew Member Details</h1>
      <div className="crew-detail">
      <img src={crewMember.profilePhoto || 'defaultImagePath.jpg'} alt="Profile" />

      <input 
        type="file" 
        name="profilePhoto" 
        onChange={handlePhotoUpload} 
      />

        <p>Full Name:</p>
        <input type="text" name="name" value={crewMember.name} onChange={handleChange} />
        <p>Birthday:</p>
        <input type="date" name="birthday" value={crewMember.birthday} onChange={handleChange} />
        <p>Email:</p>
        <input type="text" name="email" value={crewMember.email} onChange={handleChange} />
        <p>Phone Number:</p>
        <input type="text" name="phone" value={crewMember.phone} onChange={handleChange} />
        <p>Type Rating:</p>
        <select name="typerating" value={crewMember.typerating} onChange={handleChange}>
          <option value="">Select Type Rating</option>
          <option value="A319/320/321">A319/320/321</option>
          <option value="A330">A330</option>
          <option value="A350">A350</option>
        </select>

        <p>License Expiry Date:</p>
        <input type="date" name="license" value={crewMember.license} onChange={handleChange} />

        <p>Role:</p>
        <select name="role" value={crewMember.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="Pilot">Pilot</option>
          <option value="Co-Pilot">Co-Pilot</option>
          <option value="Flight Attendant">Flight Attendant</option>
          <option value="Engineer">Engineer</option>
        </select>

        <p>Status:</p>
        <select name="status" value={crewMember.status} onChange={handleChange}>
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
          <option value="Retired">Retired</option>
        </select>

        <div className='edit-delete-buttons'>
            <button onClick={handleUpdate}>Update Crew Member</button>
            <button onClick={handleDelete}>Delete Crew Member</button>
        </div>
      </div>
    </div>
  );
};

export default CrewDetailsPage;

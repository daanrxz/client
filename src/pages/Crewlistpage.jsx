// CrewListPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = "http://localhost:5005";

const CrewListPage = () => {
  const [crewMembers, setCrewMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/crews`)
      .then(response => {
        setCrewMembers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date.toLocaleDateString() : 'Invalid Date';
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Retired':
        return 'status-retired';
      case 'On Leave':
        return 'status-on-leave';
      default:
        return '';
    }
  };

  const filteredCrewMembers = crewMembers.filter(crew => 
    crew.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crew.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    formatDate(crew.birthday).toLowerCase().includes(searchQuery.toLowerCase()) ||
    (crew.typerating || 'N/A').toLowerCase().includes(searchQuery.toLowerCase()) ||
    formatDate(crew.license).toLowerCase().includes(searchQuery.toLowerCase()) ||
    crew.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="crew-list-container">
       <h1>Crew Members</h1>
       <div className="button-container">
        <Link to="/" className="back-button">Back</Link>
        <Link to="/add-crew" className="add-crew-link">Add New</Link>
      </div>
      <input 
        type="text" 
        placeholder="Search Crew Members..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="search-bar"
      />
      <table className="crew-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Birthday</th>
            <th>Type Rating</th>
            <th>License Expiry</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredCrewMembers.map(crew => (
            <tr key={crew._id} className="crew-row" onClick={() => navigate(`/crews/${crew._id}`)}>
              <td>{crew.name}</td>
              <td>{crew.role}</td>
              <td>{formatDate(crew.birthday)}</td>
              <td>{crew.typerating || 'N/A'}</td>
              <td>{formatDate(crew.license)}</td>
              <td className={getStatusClassName(crew.status)}>{crew.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrewListPage;

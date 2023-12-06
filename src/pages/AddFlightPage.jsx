import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../pages/AddFlightPage.css"


const API_URL = "http://localhost:5005";

const AddFlightPage = () => {
    const [flight, setFlight] = useState({
        flightNumber: '',
        departureAirport: '',
        arrivalAirport: '',
        departureTime: '',
        arrivalTime: '',
        aircraft: '',
        crew: [],
        airline: 'DM Airlines', // default value
        status: 'Scheduled', // default value
        price: '',
        duration: '',
    });
    const [crewMembers, setCrewMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/api/crews`)
            .then(response => {
                setCrewMembers(response.data);
            })
            .catch(error => {
                console.error("Error fetching crew:", error);
            });
    }, []);

    const handleChange = (e) => {
        setFlight({...flight, [e.target.name]: e.target.value});
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsDropdownVisible(e.target.value.length > 0);
    };

    const handleAddCrew = (crewId) => {
        if (!flight.crew.includes(crewId)) {
            setFlight({...flight, crew: [...flight.crew, crewId]});
            setSearchTerm('');
            setIsDropdownVisible(false);
        }
    };
    const handleRemoveCrew = (crewId) => {
        setFlight({...flight, crew: flight.crew.filter(id => id !== crewId)});
    };

    const filteredCrewMembers = crewMembers.filter(
        crewMember => crewMember.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/api/flights`, flight)
            .then(response => {
                console.log("Flight added:", response);
                navigate('/flights');
            })
            .catch(error => {
                console.error("Error posting flight:", error);
            });
    };

    return (
        <div className='main-add-container'>
            <div className='add-flight-container'>
                <h1 className='add-flight-title'>Add Flight</h1>
                <form onSubmit={handleSubmit} className='add-flight-form'>
                    <div className='form-group'>
                        <p>Flight Number</p>
                        <input 
                            type='text' 
                            name='flightNumber' 
                            value={flight.flightNumber} 
                            onChange={handleChange} 
                            placeholder='DM____' 
                            className='form-control'
                        />
                    </div>

                    <div className="form-group">
                        <p>Departure Airport</p>
                        <input 
                            type="text" 
                            name="departureAirport" 
                            value={flight.departureAirport} 
                            onChange={handleChange} 
                            placeholder="Departure Airport" 
                            className="form-control" 
                        />
                    </div>

                    <div className="form-group">
                        <p>Arrival Airport</p>
                        <input 
                            type="text" 
                            name="arrivalAirport" 
                            value={flight.arrivalAirport} 
                            onChange={handleChange} 
                            placeholder="Arrival Airport" 
                            className="form-control" 
                        />
                    </div>

                    <div className="form-group">
                        <p>Departure</p>
                        <input 
                            type="datetime-local" 
                            name="departureTime" 
                            value={flight.departureTime} 
                            onChange={handleChange} 
                            className="form-control" 
                        />
                    </div>

                    <div className="form-group">
                        <p>Arrival</p>
                        <input 
                            type="datetime-local" 
                            name="arrivalTime" 
                            value={flight.arrivalTime} 
                            onChange={handleChange} 
                            className="form-control" 
                        />
                    </div>

                   {/* Crew Search and Dropdown */}
                   <div className="form-group">
                        <p>Crew</p>
                        <input 
                            type="text" 
                            placeholder="Search crew..." 
                            value={searchTerm} 
                            onChange={handleSearchChange} 
                            className="form-control"
                        />
                        {isDropdownVisible && (
                            <div className="dropdown-menu">
                                {filteredCrewMembers.map(member => (
                                    <div 
                                        key={member._id} 
                                        className="dropdown-item" 
                                        onClick={() => handleAddCrew(member._id)}
                                    >
                                        {member.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Display and Manage Added Crew Members */}
                    <div className="form-group">
                        <p>Added Crew Members:</p>
                        <ul className="crew-member-list">
                            {flight.crew.map(crewId => {
                                const crewMember = crewMembers.find(member => member._id === crewId);
                                return crewMember ? (
                                    <li key={crewId} className="crew-member-item">
                                        <span>
                                            <span className="crew-member-name">{crewMember.name}</span>
                                            <span className="crew-member-role">({crewMember.role})</span>
                                        </span>
                                        <button onClick={() => handleRemoveCrew(crewId)} className="delete-button">Remove</button>
                                    </li>

                                ) : null;
                            })}
                        </ul>
                    </div>


                    <div className="form-group">
                        <p>Status</p>
                        <select 
                            name="status" 
                            value={flight.status} 
                            onChange={handleChange} 
                            className="form-control"
                        >
                            <option value="Scheduled">Scheduled</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <p>Aircraft</p>
                        <select 
                            name="aircraft" 
                            value={flight.aircraft} 
                            onChange={handleChange} 
                            className="form-control"
                        >
                            <option >N-2567GA</option>
                            <option >N-762CK</option>
                            <option >N-348AB</option>

                        </select>
                    </div>

                    <div className="form-group">
                        <p>Duration</p>
                        <input 
                            type="text" 
                            name="duration" 
                            value={flight.duration} 
                            onChange={handleChange} 
                            placeholder="Duration" 
                            className="form-control" 
                        />
                    </div>

                    <div className='form-group'>
                        <button type="submit" className="button is-white">Add Flight</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFlightPage;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./FlightDetailsPage.css"
const API_URL = "http://localhost:5005";

const FlightDetailsPage = () => {
    const [flight, setFlight] = useState({
        flightNumber: '',
        departureAirport: '',
        arrivalAirport: '',
        departureTime: '',
        arrivalTime: '',
        aircraft: '',
        crew: [],
        airline: '',
        status: '',
        price: '',
        duration: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [allCrewMembers, setAllCrewMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [error, setError] = useState('');
    const { flightId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/api/flights/${flightId}`)
            .then(response => setFlight(response.data))
            .catch(error => setError('Failed to fetch flight details'));

        axios.get(`${API_URL}/api/crews`)
            .then(response => setAllCrewMembers(response.data))
            .catch(error => setError("Error fetching crew:", error));
    }, [flightId]);

    const handleChange = (e) => {
        setFlight({ ...flight, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        axios.put(`${API_URL}/api/flights/${flightId}`, flight)
            .then(() => {
                alert("Flight updated successfully!");
                setEditMode(false);
            })
            .catch(error => setError("Error updating flight: ", error));
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this flight?");
        if (confirmDelete) {
            axios.delete(`${API_URL}/api/flights/${flightId}`)
                .then(() => {
                    alert("Flight deleted successfully!");
                    navigate('/flights');
                })
                .catch(error => setError("Error deleting flight:", error));
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsDropdownVisible(e.target.value.length > 0);
    };

    const handleAddCrewMember = (crewId) => {
        if (!flight.crew.includes(crewId)) {
            setFlight({ ...flight, crew: [...flight.crew, crewId] });
            setSearchTerm('');
            setIsDropdownVisible(false);
        }
    };

    const handleRemoveCrewMember = (crewId) => {
        setFlight({ ...flight, crew: flight.crew.filter(id => id !== crewId) });
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const filteredCrewMembers = allCrewMembers.filter(
        crewMember => crewMember.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCrewNames = (crewIds) => {
        return crewIds.map(crewId => 
            (allCrewMembers.find(member => member._id === crewId) || {}).name
        ).join(', ');
    };

    if (error) return <div>Error: {error}</div>;
    if (!flight) return <div>Loading...</div>;

    return(
        <div className='flight-details-container'>
            <h1><span>/ </span>{flight.flightNumber}</h1>
            {editMode ? (
                <div className="flight-detail">
                        <p>Flight Number</p>
                        <input type='text' name='flightNumber' value={flight.flightNumber} onChange={handleChange}/>
                        <p>Departure Airport</p>
                        <input type='name' name='departureAirport' value={flight.departureAirport} onChange={handleChange}/>
                        <p>Arrival Airport</p>
                        <input type='text' name='arrivalAirport' value={flight.arrivalAirport} onChange={handleChange}/>
                        <p>Departure</p>
                        <input type='text' name='departureTime' value={flight.departureTime} onChange={handleChange}/>
                        <p>Arrival</p>
                        <input type='text' name='arrivalTime' value={flight.arrivalTime} onChange={handleChange}/>
                        <p>Aircraft</p>
                        <select 
                            name="aircraft" 
                            value={flight.aircraft} 
                            onChange={handleChange} 
                        >
                            <option >N-2567GA</option>
                            <option >N-762CK</option>
                            <option >N-348AB</option>

                        </select>
                        <p>Status</p>
                        <select name='status' value={flight.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                        </select>
                        <p>Crew</p>
                        <input
                            type="text"
                            placeholder="Search crew..."
                            value={searchTerm}
                            onChange={handleSearchChange}

                        />
                        {isDropdownVisible && (
                            <div className="dropdown-menu">
                                {filteredCrewMembers.map(member => (
                                    <div 
                                        key={member._id} 
                                        className="dropdown-item" 
                                        onClick={() => handleAddCrewMember(member._id)}
                                    >
                                        {member.name}
                                    </div>
                                ))}
                            </div>
                        )}
                

                    {/* Display and Manage Current Crew */}
                <ul>
                    {flight.crew.map(crewId => {
                        const crewMember = allCrewMembers.find(member => member._id === crewId);
                        return crewMember ? (
                            <li key={crewId}>
                                {crewMember.name}
                                <button onClick={() => handleRemoveCrewMember(crewId)}>Remove</button>
                            </li>
                        ) : null;
                    })}
                </ul>
    
                <p>Duration</p>
                <input type='text' name='duration' value={flight.duration} onChange={handleChange} placeholder="Duration"/>
                <button onClick={handleUpdate}>Save Changes</button>
                    <button onClick={toggleEditMode}>Cancel</button>
            </div>
            ) : (
                <div className='flight-detail-main'>
                    <div className='flight-container'>
                        <div className='container1'>
                            <div className='box'>
                                <div className='box-header'>
                                    <p>Departure</p>
                                    
                                </div>

                                <div className='box-content'>
                                    <p className='status'>{flight.status}</p>
                                    <p className='airport'>{flight.departureAirport}</p>
                                    <p>{flight.departureTime}</p>
                                    <img src="/public/departure.png" width="50px"/>
                                </div>
                            </div>
                        </div>
                        <div className='container2'>
                        <div className='box'>
                            <div className='box-header'>
                            <p>Arrival</p>
                            <p>{flight.arrivalTime}</p>
                            </div>
                            <div className='box-content'>
                            <p className='airport'>{flight.arrivalAirport}</p>
                            <img src="/public/arrival.png" width="50px"/>
                                </div>
                        </div>
                        </div>
                    </div>
                {/* <div className="flight-detail-display">
                        <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
                        <p><strong>Departure Airport:</strong> {flight.departureAirport}</p>
                        <p><strong>Arrival Airport:</strong> {flight.arrivalAirport}</p>
                        <p><strong>Departure:</strong> {flight.departureTime}</p>
                        <p><strong>Arrival:</strong> {flight.arrivalTime}</p>
                        <p><strong>Aircraft:</strong> {flight.aircraft}</p>
                        <p><strong>Status:</strong> {flight.status}</p>
                        <p><strong>Crew:</strong> {getCrewNames(flight.crew)}</p>
                        <p><strong>Duration:</strong> {flight.duration}</p>
                        <button onClick={toggleEditMode}>Edit Flight Details</button>
                        <button onClick={handleDelete}>Delete Flight</button>
                    </div> */}
                </div>
                
                )}
        </div>
        
    )     
};
export default FlightDetailsPage;
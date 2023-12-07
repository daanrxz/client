import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./FlightDetailsPage.css"
import airports from '../assets/airports';
const API_URL = "https://dm-airlines.adaptable.app";

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
    const goBack = () => {
        navigate(-1); // Go back to the last page
      };

      /* GET AIRPORT NAME BY CODE */
      const getAirportNameByCode = (code) => {
        const airport = airports.find(airport => airport.code === code);
        return airport ?  airport.name : 'Unknown';
    };

    useEffect(() => {
        axios.get(`${API_URL}/api/flights/${flightId}`)
            .then(response => {
                console.log("Fetched flight data:", response.data);  // Log the fetched data
                setFlight(response.data);
            })
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
        // find the full crew member object from allCrewMembers using the crewId
        const crewMemberToAdd = allCrewMembers.find(member => member._id === crewId);
    
        // Check if the crew member is already in the flight's crew
        if (!flight.crew.some(member => member._id === crewId)) {
            setFlight({ 
                ...flight, 
                crew: [...flight.crew, crewMemberToAdd] // add the full crew member object
            });
            setSearchTerm('');
            setIsDropdownVisible(false);
        }
    };

    const handleRemoveCrewMember = (crewId) => {
        setFlight({ 
            ...flight, 
            crew: flight.crew.filter(member => member._id !== crewId) 
        });
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const filteredCrewMembers = allCrewMembers.filter(
        crewMember => crewMember.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to display date in DD/MM/YYYY - HH:MM format
    const formatDateDisplay = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} - ${hours}:${minutes}`;
};

    // Function to format date for input fields
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';

    // Format date as YYYY-MM-DDTHH:MM, recognized by date-time input fields
    return date.toISOString().slice(0, 16);
};
    if (error) return <div>Error: {error}</div>;
    if (!flight) return <div>Loading...</div>;

    return(
        <div className='flight-details-container'>
            <div className='title-details'>
                <button onClick={goBack} className='button-back-flight'>&larr;</button>
                <h1><span>/ </span>{flight.flightNumber} - {flight.status}</h1>
            </div>

            {editMode ? (
                <div className="flight-detail">
                        <p>Flight Number</p>
                        <input type='text' name='flightNumber' value={flight.flightNumber} onChange={handleChange}/>
                        <p>Departure Airport</p>
                        <select 
                            name="departureAirport" 
                            value={flight.departureAirport} 
                            onChange={handleChange}
                            className="form-control"
                        >
                            {airports.map(airport => (
                                <option key={airport.id} value={airport.code}>
                                    {airport.code} - {airport.name}
                                </option>
                            ))}
                        </select>
                        <p>Arrival Airport</p>
                        <select 
                            name="arrivalAirport" 
                            value={flight.arrivalAirport} 
                            onChange={handleChange}
                            className="form-control"
                        >
                            {airports.map(airport => (
                                <option key={airport.id} value={airport.code}>
                                    {airport.code} - {airport.name}
                                </option>
                            ))}
                        </select>
                        <p>Departure</p>
                        <input 
                            type='datetime-local' 
                            name='departureTime' 
                            value={formatDateForInput(flight.departureTime)} 
                            onChange={handleChange}
                        />
                        <p>Arrival</p>
                        <input 
                            type='datetime-local' 
                            name='arrivalTime' 
                            value={formatDateForInput(flight.arrivalTime)} 
                            onChange={handleChange}
                        />
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
                        <div className='search-container'>
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
                                        {member.name} - {member.role}
                                    </div> 
                                ))}
                            </div>
                        )}
                        </div>
                

                    {/* Display and Manage Current Crew */}
                    <ul>
                        {flight.crew.map(crewMember => (
                            <li key={crewMember._id}>
                                {crewMember.name} - {crewMember.role}
                                <button onClick={() => handleRemoveCrewMember(crewMember._id)}>Remove</button>
                            </li>
                        ))}
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
                                    <p className='airport'>{getAirportNameByCode(flight.departureAirport)}</p>
                                    <p>{formatDateDisplay(flight.departureTime)} - Local Time</p>
                                    <img src="/departure.png" width="50px"/>
                                </div>
                            </div>
                        </div>
                        <div className='container2'>
                            <div className='box'>
                                    <div className='box-header'>
                                    <p>Arrival</p>
                                    </div>
                                <div className='box-content'>
                                    <p className='airport'>{getAirportNameByCode(flight.arrivalAirport)}</p>
                                    <p>{formatDateDisplay(flight.departureTime)} - Local Time</p>
                                    <img src="/arrival.png" width="50px"/>
                                </div>
                            </div>
                        </div>
                    </div>

                <div className="flight-detail-display">
                        <h2>DETAILS</h2>
                            <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
                            <p><strong>Departure Airport: </strong>{flight.departureAirport} - {getAirportNameByCode(flight.departureAirport)}</p>
                            <p><strong>Arrival Airport:</strong> {flight.arrivalAirport} - {getAirportNameByCode(flight.arrivalAirport)}</p>
                            <p><strong>Departure: </strong>{formatDateDisplay(flight.departureTime)} - Local Time</p>
                            <p><strong>Arrival: </strong>{formatDateDisplay(flight.arrivalTime)} - Local Time</p>
                            <p><strong>Aircraft:</strong> {flight.aircraft}</p>
                            <p><strong>Status:</strong> {flight.status}</p>
                        <div className="crew-list">
                            <p>Crew Members:</p>
                            <ul>
                                {flight.crew.map(member => (
                                    <li key={member._id}>
                                        <Link to={`/crews/${member._id}`}>
                                            {member.name} - {member.role}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p><strong>Duration:</strong> {flight.duration}</p>
                        <button onClick={toggleEditMode}>Edit Flight Details</button>
                        <button onClick={handleDelete}>Delete Flight</button>
                    </div>
                </div>
                
                )}
        </div>
        
    )     
};
export default FlightDetailsPage;
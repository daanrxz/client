import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
            .catch(error => console.error("Error fetching crew:", error));
    }, [flightId]);

    const filteredCrewMembers = allCrewMembers.filter(
        crewMember => crewMember.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUpdate = () => {
        axios.put(`${API_URL}/api/flights/${flightId}`, flight)
            .then(() => {
                alert("Flight updated successfully!");
                navigate('/flights');
            })
            .catch(error => console.error("Error updating flight: ", error));
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this flight?");
        if (confirmDelete) {
            axios.delete(`${API_URL}/api/flights/${flightId}`)
                .then(() => {
                    alert("Flight deleted successfully!");
                    navigate('/flights');
                })
                .catch(error => console.error("Error deleting flight:", error));
        }
    };

    const handleChange = (e) => setFlight({ ...flight, [e.target.name]: e.target.value });

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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsDropdownVisible(e.target.value.length > 0);
    };

    if (error) return <div>Error: {error}</div>;
    if (!flight) return <div>Loading...</div>;
    /*  */
    return(
        <div className='flight-details-container'>
            <h1>Flight Details</h1>
            <div className="flight-detail">
            <p><strong>Flight Number: </strong>{flight.flightNumber}</p>
                {/* <input type='text' name='flightNumber' value={flight.flightNumber} onChange={handleChange} placeholder=" Flight Number" /> */}
                <p>Departure Airport</p>
                <input type='name' name='departureAirport' value={flight.departureAirport} onChange={handleChange} placeholder="Departure Airport" />
                <p>Arrival Airport</p>
                <input type='text' name='arrivalAirport' value={flight.arrivalAirport} onChange={handleChange} placeholder="Arrival Airport"/>
                <p>Departure Time</p>
                <input type='text' name='departureTime' value={flight.departureTime} onChange={handleChange} placeholder="Departure Time"/>
                <p>Arrival Time</p>
                <input type='text' name='arrivalTime' value={flight.arrivalTime} onChange={handleChange} placeholder="Arrival Time"/>
                <p>Aircraft</p>
                <input type='text' name='aircraft' value={flight.aircraft} onChange={handleChange} placeholder="Aircraft"/>
                
                <p>Airline</p>
                <input type='text' name='airline' value={flight.airline} onChange={handleChange} placeholder="Airline"/>
                <p>Status</p>
                <select name='status' value={flight.status} onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Delayed">Delayed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
                </select>
                 {/* Crew Search and Dropdown */}
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
                <p>Price</p>
                <input type='text' name='price' value={flight.price} onChange={handleChange} placeholder="Price"/>
                <p>Duration</p>
                <input type='text' name='duration' value={flight.duration} onChange={handleChange} placeholder="Duration"/>
                <div className='edit-delete-buttons'>
                    <button onClick={handleUpdate}>Update Flight</button>
                    <button onClick={handleDelete}>Delete Flight</button>
                    <Link to="/flights" className='see-flight-list-link'>See Flight List</Link>
                </div>
            </div>
        </div>
    );
};
export default FlightDetailsPage;
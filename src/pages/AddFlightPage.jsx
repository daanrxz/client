import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    const [selectedCrew, setSelectedCrew] = useState(''); // New state to track the selected crew member
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

    const handleCrewChange = (e) => {
        setSelectedCrew(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddCrew = () => {
        // Add the selected crew member to the flight's crew list
        if (selectedCrew && !flight.crew.includes(selectedCrew)) {
            setFlight({...flight, crew: [...flight.crew, selectedCrew]});
        }
    };

      // Get added crew member details for display
      const addedCrewMembers = crewMembers.filter(crewMember => 
        flight.crew.includes(crewMember._id)
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

    const filteredCrewMembers = crewMembers.filter(
        crewMember => crewMember.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='main-add-container'>
            <div className='add-flight-container'>
                <h1 className='add-flight-title'>Add Flight Form</h1>
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
                        <p>Departure Time</p>
                        <input 
                            type="datetime-local" 
                            name="departureTime" 
                            value={flight.departureTime} 
                            onChange={handleChange} 
                            className="form-control" 
                        />
                    </div>

                    <div className="form-group">
                        <p>Arrival Time</p>
                        <input 
                            type="datetime-local" 
                            name="arrivalTime" 
                            value={flight.arrivalTime} 
                            onChange={handleChange} 
                            className="form-control" 
                        />
                    </div>

                    <div className="form-group">
                        <p>Crew</p>
                        <input 
                            type="text" 
                            placeholder="Search crew..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="form-control"
                        />
                        <select 
                            value={selectedCrew} 
                            onChange={handleCrewChange} 
                            className="form-control"
                        >
                            <option value="">Select Crew</option>
                            {filteredCrewMembers.map(crewMember => (
                                <option key={crewMember._id} value={crewMember._id}>
                                    {crewMember.name}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={handleAddCrew} className="btn btn-primary">
                            Add Crew Member
                        </button>
                    </div>

                    {/* Display added crew members */}
                    <div className="form-group">
                        <p>Added Crew Members:</p>
                        <ul>
                            {addedCrewMembers.map(crewMember => (
                                <li key={crewMember._id}>{crewMember.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="form-group">
                        <p>Airline</p>
                        <input 
                            type="text" 
                            name="airline" 
                            value={flight.airline} 
                            onChange={handleChange} 
                            placeholder="Airline" 
                            className="form-control" 
                        />
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
                        <p>Price</p>
                        <input 
                            type="text" 
                            name="price" 
                            value={flight.price} 
                            onChange={handleChange} 
                            placeholder="Price" 
                            className="form-control" 
                        />
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
                        <button type="submit" className="add-flight-button">Add Flight</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFlightPage;

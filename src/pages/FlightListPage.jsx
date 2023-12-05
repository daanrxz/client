import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = "http://localhost:5005";

const FlightListPage = () => {
    const [flights, setFlights] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/api/flights`)
            .then(response => {
                setFlights(response.data);
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
            case 'Scheduled':
                return 'status-scheduled';
            case 'Delayed':
                return 'status-delayed';
            case 'Cancelled':
                return 'status-cancelled';
            case 'Completed':
                return 'status-completed';
            default:
                return '';
        }
    };

    const filteredFlights = flights.filter(flight =>
        flight.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.departureAirport.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.arrivalAirport.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.airline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='flight-list-container'>
        <h1>Flight List</h1>
        <div className='button-container'>
            <Link to="/" className='back-button'>Back to Home Page</Link>
            <Link to="/add-flight" className='add-flight-link'>Add new flight</Link>
        </div>
        <input
            type='text'
            placeholder='Search Flights...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='search-bar'
        />
        <table className='flight-table'>
            <thead>
                <tr>
                    <th>Flight Number</th>
                    <th>Departure Airport</th>
                    <th>Arrival Airport</th>
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                   {/*  <th>Aircraft</th>
                    <th>Crew</th> */}
                    <th>Airline</th>
                    <th>Status</th>
                 {/*    <th>Price</th> */}
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {filteredFlights.map(flight => (
                    <tr key={flight._id} className='flight-row' onClick={() => navigate(`/flights/${flight._id}`)}>
                        <td>{flight.flightNumber}</td>
                        <td>{flight.departureAirport}</td>
                        <td>{flight.arrivalAirport}</td>
                        <td>{formatDate(flight.departureTime)}</td>
                        <td>{formatDate(flight.arrivalTime)}</td>
                      {/*   <td>{flight.aircraft}</td>
                        <td>{flight.crew}</td> */}
                        <td>{flight.airline}</td>
                        <td className={getStatusClassName(flight.status)}>{flight.status}</td>
                        <td>{flight.duration}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      
    );
};

export default FlightListPage;

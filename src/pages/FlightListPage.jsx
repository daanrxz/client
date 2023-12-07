import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./FlightListPage.css"

const API_URL = "https://dm-airlines.adaptable.app";
/* "https://dm-airlines.adaptable.app" */
const FlightListPage = () => {
    const [flights, setFlights] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1); // Go back to the last page
      };

    useEffect(() => {
        axios.get(`${API_URL}/api/flights`)
            .then(response => {
                setFlights(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    /* FORMAT DATE */
   const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
   }
   /* adding status classname */
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
        flight.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='flight-list-container'>
            <h1>Flight List</h1>
            <div className='button-container'>
                <button onClick={goBack} className='button-back-flight'>&larr;</button>
                <Link to="/add-flight" className='add-crew-link'>Add Flight</Link>
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
                        <th>Departure<br></br>(LocalTime)</th>
                        <th>Arrival<br></br>(LocalTime)</th>
                        <th>Aircraft</th>
                        <th>Status</th>
                        <th>Duration<br></br>(Minutes)</th>
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
                            <td>{flight.aircraft}</td>
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

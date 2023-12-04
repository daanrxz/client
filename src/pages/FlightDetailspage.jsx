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
        crew: '',
        airline: '',
        status: '',
        price: '',
        duration: '',
    });
    const [error, setError] = useState('');
    const { flightId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${API_URL}/api/flights/${flightId}`)
            .then(response => {
            const formattedData = {
                ...response.data,
                /* talvez precise mudar DepartureTime, ArrivalTime, duration  */
            };
            // Setting the formatted data to the state variable 'flight'
            setFlight(formattedData);
            })
            .catch(error => {
            setError('Failed to fetch flight details');
        });
    }, [flightId]);
    const handleUpdate = () => {
        axios.put(`${API_URL}/api/flights/${flightId}`, flight)
            .then(() => {
            alert("Flight updated successfully!");
            navigate('/flights');
        })
            .catch(error => {
            console.error("Error updating flight: ", error);
        });
    };
    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this flight?");
        if (confirmDelete) {
            axios.delete(`${API_URL}/api/flights/${flightId}`)
            .then(() => {
                alert("Flight deleted successfully!");
                navigate('/flights');
            })
            .catch(error => {
                console.error("Error deleting flight:", error);
            });
        }
    };
    const handleChange = (e) => {
        setFlight({ ...flight, [e.target.name]: e.target.value });
    };
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!flight) {
        return <div>Loading...</div>;
    }
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
                <p>Crew</p>
                <input type='text' name='crew' value={flight.crew} onChange={handleChange} placeholder="Crew" />
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
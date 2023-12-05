import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const API_URL = "http://localhost:5005";
const AddFlightPage = () => {
    const [flight, setFlight] = useState({
        flightNumber: '',
        departureAirport: '',
        arrivalAirport: '',
        departureTime: '',
        arrivalTime: '',
        aircraft: '',
        crew: '',
        airline: 'DM Airlines', // default value
        status: 'Scheduled', // default value
        price: '',
        duration: '',
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFlight({...flight, [e.target.name]: e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting flight:", flight); // Debug: log the flight data
    
        axios.post(`${API_URL}/api/flights`, flight)
            .then((response) => {
                console.log(response);
                navigate(`/flights`);
            }).catch((error) => {
                console.error("Error posting flight:", error.response); // log error response
            });
    }
    
    return (
    <div className='main-add-container'>
    <div className='add-flight-container'>
        <h1 className= 'add-flight-tittle'>Add Flight Form</h1>
        <form onSubmit={handleSubmit} className='add-flight-form'>
            {/* flightNumber */}
            <div className='form-group'>
                <p>Flight Number</p>
                <input type='text' name='flightNumber' value={flight.flightNumber} onChange={handleChange} placeholder='DM____' className='form-control'/>
            </div>
            {/* departureAirport  */}
            <div className="form-group">
                <p>Departure Airport</p>
                <input type="text" name="departureAirport" value={flight.departureAirport} onChange={handleChange} placeholder="Departure Airport" className="form-control" />
            </div>
            {/*  arrivalAirport */}
            <div className="form-group">
                <p>Arrival Airport</p>
                <input type="text" name="arrivalAirport" value={flight.arrivalAirport} onChange={handleChange} placeholder="Arrival  Airport" className="form-control" />
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
            {/* aircraft */}
            {/* <div className="form-group">
                <p>Aircraft</p>
                <input type="text" name="aircraft" value={flight.aircraft} onChange={handleChange} placeholder="Aircraft" className="form-control" />
            </div> */}
            {/* crew */}
            {/* <div className="form-group">
                <p>Crew</p>
                <input type="text" name="crew" value={flight.crew} onChange={handleChange} placeholder="Crew" className="form-control" />
            </div> */}
            {/* airline */}
            <div className="form-group">
                <p>Airline</p>
                <input type="text" name="airline" value={flight.airline} onChange={handleChange} placeholder="Airline" className="form-control" />
            </div>
            {/* status */}
            <div className="form-group">
                <p>Status</p>
                <select name="status" value={flight.status} onChange={handleChange} className="form-control">
                <option value="Scheduled">Scheduled</option>
                <option value="Delayed">Delayed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
                </select>
            </div>
            {/* price */}
            <div className="form-group">
                <p>Price</p>
                <input type="text" name="price" value={flight.price} onChange={handleChange} placeholder="Price" className="form-control" />
            </div>
            {/* duration */}
            <div className="form-group">
                <p>Duration</p>
                <input type="text" name="duration" value={flight.duration} onChange={handleChange} placeholder="Duration" className="form-control" />
            </div>
            <div className='form-group'>
                <button type="submit" className="add-flight-button">Add Flight</button>
            </div>
        </form>
    </div>
    </div>
    )
}
export default AddFlightPage;
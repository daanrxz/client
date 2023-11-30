import {useContext, useState} from 'react';
import { AuthContext } from '../Context/auth.context';
import axios from 'axios';

import {Link, useNavigate} from 'react-router-dom';

const API_URL = "http://localhost:5005";


function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // use shared functions provided by AuthContext 
    const {storeToken, authenticateUser} = useContext(AuthContext);

    const handleLoginSubmit = (e) =>{
        e.preventDefault();

        const requestBody = {email, password};

        axios.post(`${API_URL}/auth/login`, requestBody)
            .then((response)=>{
                storeToken(response.data.authToken);
                authenticateUser();
                navigate('/');
            })
            .catch((error)=>{
                const errorDescription = error.response.data.message; 
                setError(errorDescription);
            })

    }
    
    return(<div className="login-page">
        <Link to="/" className="home-back-button">Back</Link> {/* Back to Home button */}
    <div className="login-container">
      <h1 className="login-title">Login Page</h1>
      <form onSubmit={handleLoginSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <button type="submit" className="login-button">Login</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <p className="signup-prompt">Don't have an account yet?</p>
        <Link to={"/signup"} className="signup-link">Sign Up</Link>
      </form>
    </div>
  </div>
  )

}

export default LoginPage
import axios from 'axios';

import {useState} from 'react';

import {Link, useNavigate} from 'react-router-dom';

const API_URL = "http://localhost:5005";

function SignUpPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignUpSubmit = (e) => {
        // Prevent default actions of the form submission e.g.: refreshing the page
        e.preventDefault();

        // Create a request body object
        const requestBody = {email, password, name};

        axios.post(`${API_URL}/signup`, requestBody)
            .then(()=>{
                navigate('/login');
            })
            .catch((error)=>{
                const errorDescription = error.response.data.message;
                console.log(errorDescription)
                setError(errorDescription);
            })
    }

return(
    <div className="page-container">
        <Link to="/" className="home-back-button">Back</Link> {/* Back to Home button */}
    <div className="form-container">
      <h1 className="form-title">Sign-up Page</h1>
      <form onSubmit={handleSignUpSubmit} className="signup-form">
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="username" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
        {error && <p className="error-message">{error}</p>}
        <p className="login-prompt">Already have an account?</p>
        <Link to={"/login"} className="login-link">Login</Link>
      </form>
    </div>
  </div>
  )

}

export default SignUpPage;
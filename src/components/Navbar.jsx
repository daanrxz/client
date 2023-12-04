import { Link } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import { useContext } from "react";

function Navbar() {
  const { isLoggedIn, user, logOut } = useContext(AuthContext);

  const logOutUser = () => {
    logOut();
  };

  if (!isLoggedIn) {
    return null;
  }
  
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="logo-white.png" alt="Logo" className="logo-img" />
      </div>

      <div className="nav-buttons">
        <Link to="/" className="nav-link">
          <button className="nav-button">Home</button>
        </Link>

        {/* New Button to Crew Members Page */}
        <Link to="/crews" className="nav-link">
          <button className="nav-button">Crew</button>
        </Link>
        <Link to="/flights" className="nav-link">
          <button className="nav-button">Flights</button>
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/profile" className="nav-link">
              <button className="nav-button">Profile</button>
            </Link>
            <button onClick={logOutUser} className="nav-button">Logout</button>
            <span className="nav-user-name"><b>User: </b>{user && user.name}</span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup" className="nav-link">
              <button className="nav-button">Sign Up</button>
            </Link>
            <Link to="/login" className="nav-link">
              <button className="nav-button">Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

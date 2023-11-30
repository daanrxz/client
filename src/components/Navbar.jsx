import { Link } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import { useContext } from "react";

function Navbar() {
  const { isLoggedIn, user, logOut } = useContext(AuthContext);

  const logOutUser = () => {
    logOut();
  };

  // If not logged in, return null or any other placeholder
  if (!isLoggedIn) {
    return null; // or return a minimal component or any placeholder you prefer
  }
  
  // If logged in, return the full navbar
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="logo-white.png" alt="Logo" className="logo-img" />
      </div>

      <div className="nav-buttons">
        <Link to="/" className="nav-link">
          <button className="nav-button">Home</button>
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

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";


    function HomePage() {
        const { isLoggedIn, user, logOut } = useContext(AuthContext);
      
        return (
            <div className="homepage-container">
            <div className="overlay"></div>
            <div className="homepage-content">
              <img src="logo-white.png" alt="Logo" className="homepage-logo" />
              <div className="homepage-buttons">
                {!isLoggedIn ? (
                  <>
                    <Link to="/signup" className="button button-signup">Sign Up</Link>
                    <Link to="/login" className="button button-login">Login</Link>
                  </>
                ) : (
                  <>
                    <h2>Welcome, {user.name}!</h2>
                    </>
                )}
              </div>
            </div>
          </div>
        );
      }
      
      export default HomePage;

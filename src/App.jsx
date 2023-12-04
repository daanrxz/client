import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/Profile";
import CrewListPage from './pages/Crewlistpage';
import AddCrewPage from './pages/Addcrewpage';
import CrewDetailsPage from "./pages/CrewDetailsPage";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>

        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/crews" element={<CrewListPage />} />
        <Route path="/add-crew" element={<AddCrewPage />} />
        <Route path="/crews/:crewId" element={<CrewDetailsPage/>}/>
        <Route path="/add-flight" element={<AddFlightPage />}/>
        <Route path="/flights/:flightId" element={<FlightDetailsPage />}/>
        <Route path="/flights" element={<FlightListPage />}/>
      </Routes>
    </div>
  );
}

export default App;

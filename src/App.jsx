import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>

        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/profile" element={<ProfilePage />} /> 
      </Routes>
    </div>
  );
}

export default App;

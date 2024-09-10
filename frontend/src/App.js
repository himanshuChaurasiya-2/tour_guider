import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Guides";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Footer from "./Components/Footer";
import ErrorCode from "./Components/ErrorCode";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsAuthenticated(true);
      } else {
        console.error("Failed to fetch user data:", response.status);
        navigate("/login");
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    fetchUserData(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route
          path="/profile/*"
          element={
            isAuthenticated ? (
              <Profile user={user} isAuthenticated={isAuthenticated} />
            ) : (
              <ErrorCode />
            )
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

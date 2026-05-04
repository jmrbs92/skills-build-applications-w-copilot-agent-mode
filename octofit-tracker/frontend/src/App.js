import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src="/logo192.png" alt="OctoFit Tracker Logo" className="me-2" style={{height: '40px'}} />
              OctoFit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <div className="card main-card shadow-sm">
                  <div className="card-body">
                    <h1 className="card-title">Welcome to OctoFit Tracker</h1>
                    <p className="card-text">Browse API-backed fitness activity data with React and Bootstrap. Click a section below to get started.</p>
                    <Link className="btn btn-primary me-3" to="/activities">Activities</Link>
                    <Link className="btn btn-outline-secondary" to="/leaderboard">Leaderboard</Link>
                  </div>
                </div>
              }
            />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        <footer className="footer-note">
          <div className="container">
            <p>Powered by React, Bootstrap, and the OctoFit Tracker REST API.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

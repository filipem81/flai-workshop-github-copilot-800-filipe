import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Workouts from './components/Workouts';

const features = [
  { to: '/users',       icon: '👤', label: 'Users',       desc: 'View all registered members.' },
  { to: '/activities',  icon: '🏃', label: 'Activities',  desc: 'Log and browse fitness activities.' },
  { to: '/leaderboard', icon: '🏆', label: 'Leaderboard', desc: 'See who is leading the pack.' },
  { to: '/teams',       icon: '🤝', label: 'Teams',       desc: 'Manage and join fitness teams.' },
  { to: '/workouts',    icon: '💪', label: 'Workouts',    desc: 'Discover personalised workouts.' },
];

function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="octofit-hero text-center">
        <img
          src="/octofitapp-small.png"
          alt="OctoFit"
          height="72"
          className="mb-3"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <h1>Welcome to OctoFit Tracker</h1>
        <p className="lead mb-0">
          Track your fitness activities, join teams, and compete on the leaderboard.
        </p>
      </div>

      {/* Feature cards */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-3">
        {features.map(({ to, icon, label, desc }) => (
          <div className="col" key={to}>
            <Link to={to} className="octofit-feature-card card h-100 p-3 text-center d-block">
              <div className="octofit-feature-icon">{icon}</div>
              <h5 className="card-title fw-semibold">{label}</h5>
              <p className="card-text text-muted small">{desc}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="d-flex flex-column">
        {/* ── Navbar ── */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container">
            <NavLink className="navbar-brand octofit-brand" to="/">
              <img
                src="/octofitapp-small.png"
                alt="OctoFit"
                height="28"
                className="d-inline-block align-top me-2"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              OctoFit Tracker
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {features.map(({ to, icon, label }) => (
                  <li className="nav-item" key={to}>
                    <NavLink
                      className={({ isActive }) =>
                        'nav-link' + (isActive ? ' active' : '')
                      }
                      to={to}
                    >
                      {icon} {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* ── Page body ── */}
        <main className="octofit-page">
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users"       element={<Users />} />
              <Route path="/activities"  element={<Activities />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/teams"       element={<Teams />} />
              <Route path="/workouts"    element={<Workouts />} />
            </Routes>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="octofit-footer mt-auto">
          © {new Date().getFullYear()} OctoFit Tracker &mdash; Built with React &amp; Django
        </footer>
      </div>
    </Router>
  );
}

export default App;

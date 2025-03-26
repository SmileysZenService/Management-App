import React from 'react';
import { NavLink } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import './Navigation.css';

const Navigation = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="nav-bar">
      <div className="logo">Ultimate Task Manager</div>
      <ul className="nav-links">
        <li><NavLink end to="/" activeClassName="active-link">Home</NavLink></li>
        <li><NavLink to="/tasks" activeClassName="active-link">Tasks</NavLink></li>
        <li><NavLink to="/about" activeClassName="active-link">About</NavLink></li>
      </ul>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </nav>
  );
};

export default Navigation;

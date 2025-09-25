import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="logo.svg" alt="Company Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} end>
              List
            </NavLink>
          </li>
          <li>
            <NavLink to="/article/972d2b8a" className={({ isActive }) => (isActive ? 'active' : '')}>
              Article
            </NavLink>
          </li>
          <li>
            <NavLink to="/doom" className={({ isActive }) => (isActive ? 'active' : '')}>
              Doom
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
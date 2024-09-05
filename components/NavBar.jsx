import React from 'react';
import "./NavBar.css";
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <header className='header'>
        <NavLink to='/' className='logo'>CARS</NavLink>
        <nav className='navbar'>
            <NavLink to='/' className={({ isActive })=> isActive ? 'active' : ''}>Home</NavLink>
            <NavLink className={({ isActive })=> isActive ? 'active' : ''} to='/contact'>Contact</NavLink>
            <NavLink to='/about' className={({ isActive })=> isActive ? 'active' : ''}>About</NavLink>
            <NavLink to='/dealers' className={({ isActive })=> isActive ? 'active' : ''}>Dealers</NavLink>
        </nav>
    </header>
  );
}

export default NavBar;

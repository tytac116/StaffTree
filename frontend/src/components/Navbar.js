import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav>
            <div className="logo">StaffTree</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                {isLoggedIn && <li><Link to="/hierarchy">Hierarchy</Link></li>}
                {/* <li><Link to="/register-company">Register Company</Link></li> */}
                <li><Link to="/login">Login</Link></li>
                {isLoggedIn && <li><button onClick={handleLogout}>Logout</button></li>}
            </ul>
        </nav>
    );
};

export default Navbar;
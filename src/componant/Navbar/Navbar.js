import React, { useContext } from 'react';
import './Navbar.css';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../App';

const Navbar = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);


    
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className='navbar'>
            
            <div className="navbar-left">
                <Link to="/" className="app-label">
                    Contact Management Application
                </Link>
            </div>
            <div className="navbar-center">
                <div className="import-export-buttons">
                    <button onClick={() => navigate('/import')} className="action-button">
                        Import
                    </button>
                    <span className="divider">|</span>
                    <button onClick={() => navigate('/export')} className="action-button">
                        Export
                    </button>
                </div>
            </div>
            <div className="navbar-right">
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;

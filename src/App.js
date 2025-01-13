import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../src/componant/Dashboard/Dashboard';
import AddUser from '../src/componant/Dashboard/Addcontact/AddUser';
import Login from './componant/Login/Login';
import EditUser from './componant/Dashboard/Addcontact/EditContact';
import Import from './componant/Dashboard/Import';
import Export from './componant/Dashboard/Export';
import axios from 'axios';

// Create Authentication Context
const AuthContext = createContext(null);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const parseJSON = (value) => {
    try {
        return value ? JSON.parse(value) : null;
    } catch (e) {
        console.error("Parsing error on", value);
        return null;
    }
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return parseJSON(storedUser);
    });
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);

    const login = (userData, token) => {
        setIsAuthenticated(true);
        setUser(userData);
        setToken(token);

        // Persist authentication state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);

        // Remove authentication state from localStorage
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
                        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/addUser" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
                        <Route path="/import" element={<ProtectedRoute><Import /></ProtectedRoute>} />
                        <Route path="/export" element={<ProtectedRoute><Export /></ProtectedRoute>} />
                        <Route path="/editUser/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export { AuthContext };
export default App;
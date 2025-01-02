import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './componant/Dashboard/Dashboard';
import AddUser from './componant/Dashboard/Addcontact/AddUser';
import Login from './componant/Login/Login';
import EditUser from './componant/Dashboard/Addcontact/EditContact';
import Import from './componant/Dashboard/Import';
import Export from './componant/Dashboard/Export';


// Create Authentication Context
const AuthContext = createContext(null);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated
    ? children
    : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [user, setUser] = useState(() => {

    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });



  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    
    // Persist authentication state
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    
    // Remove authentication state from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };


  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
    }
  }, [isAuthenticated, user]);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout
    }}>
      <BrowserRouter>
        <div className="App">
          <Routes>

            <Route
              path="/login"
              element={
                isAuthenticated
                  ? <Navigate to="/" replace />
                  : <Login />
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/addUser"
              element={
                <ProtectedRoute>
                  <AddUser/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/import"
              element={
                <ProtectedRoute>
                  <Import/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/export"
              element={
                <ProtectedRoute>
                  <Export/>
                </ProtectedRoute>
              }
            />
            <Route path="/editUser/:id" element={<EditUser/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default App;
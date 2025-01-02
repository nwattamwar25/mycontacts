import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/slices/contactSlice';
import { useNavigate } from 'react-router-dom';
import classes from "./Addcontact/AddUser.module.css";

const Import = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setError('');

    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const parsedData = JSON.parse(e.target.result);
          // Validate the structure of imported data
          if (Array.isArray(parsedData)) {
            const isValidData = parsedData.every(contact => 
              contact.name && 
              contact.phone && 
              contact.email && 
              contact.cGroup
            );
            
            if (isValidData) {
              setJsonData(parsedData);
              setError('');
            } else {
              setError('Invalid data structure. Each contact must have name, phone, email, and cGroup.');
            }
          } else {
            setError('Imported file must contain an array of contacts');
          }
        } catch (err) {
          setError('Error parsing JSON file. Please ensure it\'s valid JSON.');
        }
      };

      reader.onerror = () => {
        setError('Error reading file');
      };

      reader.readAsText(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!jsonData) {
      setError('Please import data before submitting');
      return;
    }

    try {
      // Add contacts one by one
      for (const contact of jsonData) {
        await dispatch(addContact({
          ...contact,
          created_At: contact.created_At || new Date().toISOString()
        })).unwrap();
      }
      
      alert(`Successfully imported ${jsonData.length} contacts`);
      navigate("/");
    } catch (error) {
      setError('Failed to import contacts: ' + error.message);
    }
  };

  return (
    <div className={classes.cardStyle}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Import Contacts</h2>
      
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroupStyle}>
          <label className={classes.labelStyle}>
            Select JSON File *
          </label>
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className={classes.inputStyle}
          />
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '15px' }}>
            {error}
          </div>
        )}

        {jsonData && (
          <div className={classes.formGroupStyle}>
            <h3>Preview ({jsonData.length} contacts):</h3>
            <pre className="bg-gray-100 p-4 rounded max-h-60 overflow-auto">
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          </div>
        )}

        <button 
          type="submit" 
          className={classes.buttonStyle}
          disabled={!jsonData}
        >
          Import Contacts
        </button>
      </form>
    </div>
  );
};

export default Import;
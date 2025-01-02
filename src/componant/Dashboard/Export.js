import React from 'react';
import { useSelector } from 'react-redux';
import classes from "../Dashboard/Addcontact/AddUser.module.css"; 

const Export = () => {
  const contacts = useSelector((state) => state.contacts); // Adjust based on your store structure

  const handleExport = () => {
    try {
      // Convert contacts data to JSON string
      const jsonString = JSON.stringify(contacts, null, 2);
      
      // Create a blob from the JSON string
      const blob = new Blob([jsonString], { type: 'application/json' });
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = url;
      
      // Set the file name with current date
      const date = new Date().toISOString().split('T')[0];
      link.download = `contacts_${date}.json`;
      
      // Append link to body, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      window.URL.revokeObjectURL(url);

      // Show success message
      alert('Contacts exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export contacts. Please try again.');
    }
  };

  return (
    <div className={classes.cardStyle}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Export Contacts</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <p>Click the button below to export all your contacts in JSON format.</p>
        <p>The exported file will include:</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>Contact names</li>
          <li>Phone numbers</li>
          <li>Email addresses</li>
          <li>Contact groups</li>
          <li>Creation dates</li>
        </ul>
      </div>

      <button 
        onClick={handleExport}
        className={classes.buttonStyle}
      >
        Export Contacts
      </button>
    </div>
  );
};

export default Export;
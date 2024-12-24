import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../../redux/slices/contactSlice';
import classes from "./AddUser.module.css"
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cGroup: '',
    created_At: ''
  });

  const contactGroups = [
    "Family", 
    "Work", 
    "Friends", 
    "Clients", 
    "Personal", 
    "Professional"
  ];

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    cGroup: '',
    created_At: ''
  });

   const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.length < 2) {
      tempErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    } else {
      tempErrors.name = '';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone) {
      tempErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      tempErrors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    } else {
      tempErrors.phone = '';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
      isValid = false;
    } else {
      tempErrors.email = '';
    }

    if (!formData.cGroup.trim()) {
      tempErrors.cGroup = 'Group is required';
      isValid = false;
    } else {
      tempErrors.cGroup = '';
    }

  
    if (!formData.created_At) {
      tempErrors.created_At = 'Date is required';
      isValid = false;
    } else {
      tempErrors.created_At = '';
    }

    setErrors(tempErrors);
    return isValid;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(addContact({
        ...formData,
        // Remove generated ID, backend handle ID generation
        created_At: formData.created_At || new Date().toISOString()
      })).then(() => {
        navigate("/");
      }).catch((error) => {
        console.error("Failed to add contact", error);
      });
    }
  };
  
  const errorStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px'
  };
  
  return (
    <div className={classes.cardStyle}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Add New User</h2>
      
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroupStyle}>
          <label htmlFor="name" className={classes.labelStyle}>
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            className={`${classes.inputStyle} ${errors.name ? classes.errorInput : ''}`}
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}
        </div>

        <div className={classes.formGroupStyle}>
          <label htmlFor="phone" className={classes.labelStyle}>
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            className={`${classes.inputStyle} ${errors.phone ? classes.errorInput : ''}`}
          />
          {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
        </div>

        <div className={classes.formGroupStyle}>
          <label htmlFor="email" className={classes.labelStyle}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className={`${classes.inputStyle} ${errors.email ? classes.errorInput : ''}`}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>

        <div className={classes.formGroupStyle}>
          <label htmlFor="cGroup" className={classes.labelStyle}>
            Contact Group *
          </label>
          <select
            id="cGroup"
            name="cGroup"
            value={formData.cGroup}
            onChange={handleChange}
            className={`${classes.inputStyle} ${errors.cGroup ? classes.errorInput : ''}`}
          >
            <option value="">Select a Contact Group</option>
            {contactGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          {errors.cGroup && <div style={errorStyle}>{errors.cGroup}</div>}
        </div>
        <div className={classes.formGroupStyle}>
          <label htmlFor="createdAt" className={classes.labelStyle}>
            Created At *
          </label>
          <input
            type="datetime-local"
            id="createdAt"
            name="created_At"
            value={formData.created_At}
            onChange={handleChange}
            className={`${classes.inputStyle} ${errors.created_At ? classes.errorInput : ''}`}
          />
          {errors.created_At && <div style={errorStyle}>{errors.created_At}</div>}
        </div>

        <button 
          type="submit" 
          className={classes.buttonStyle}
        >
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default AddUser;
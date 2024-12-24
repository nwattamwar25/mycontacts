import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/slices/contactSlice';
import Navbar from '../Navbar/Navbar';
import { Plus, Search } from 'lucide-react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Display from '../Display/Display';
import DeleteDisplay from '../Display/DeleteDisplay'
import Button from '../ui/Button';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Get contacts from Redux store
    const { contacts, loading, error } = useSelector((state) => state.contacts);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    // Fetch contacts when component mounts
    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleAddUser = () => {
        navigate('/addUser');
    };

    const handleEditUser = (contactId) => {
        navigate(`/editUser/${contactId}`);
    };

    const handleDeleteClick = (contact) => {
        setContactToDelete(contact);
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = () => {
        if (contactToDelete) {
            dispatch(deleteContact(contactToDelete.id));
            setShowDeleteConfirmation(false);
            setContactToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
        setContactToDelete(null);
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleShowMore = (contact) => {
        setSelectedContact(contact);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContact(null);
    };

    // Loading and error handling
    if (loading) return <div>Loading contacts...</div>;
    if (error) return <div>Error loading contacts: {error.message}</div>;

    return (
        <div className="dashboard">
            <Navbar />
            <div className="dashboard-controls">
                <div className="search-container">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <button className="add-contact-btn" onClick={handleAddUser}>
                    <Plus size={20} />
                    <span>Add Contact</span>
                </button>
            </div>
            <div className="contact-cards">
                {filteredContacts.map((contact) => {
                    const date = new Date(contact.created_At);
                    const formattedDate = date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    return (
                        <Card className="contact-card" contact={contact} key={contact.id}>
                            <h3>{formattedDate}</h3>
                            <p>Name: {contact.name}</p>
                            <p>Contact: {contact.phone}</p>
                            <div className="button-group">
                                <Button 
                                    className='btn' 
                                    onClick={() => handleShowMore(contact)}
                                >
                                    Show More
                                </Button>
                                <Button 
                                    className='btn edit-btn' 
                                    onClick={() => handleEditUser(contact.id)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    className='btn delete-btn' 
                                    onClick={() => handleDeleteClick(contact)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </div>
            
            {showModal && selectedContact && (
                <Display 
                    title={selectedContact.name}
                    message={`Phone: ${selectedContact.phone}\nCreatedAt: ${new Date(selectedContact.created_At).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}\nEmail: ${selectedContact.email}\nContactGroup: ${selectedContact.cGroup}`}
                    onConfirm={handleCloseModal}
                />
            )}

            {showDeleteConfirmation && contactToDelete && (
                <DeleteDisplay 
                    title="Confirm Delete"
                    message={`Are you sure you want to delete contact "${contactToDelete.name}"?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    showCancelButton={true}
                />
            )}
        </div>
    );
};

export default Dashboard;
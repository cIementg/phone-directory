import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NewContact from "./NewContact";
const API_URL = process.env.REACT_APP_API_URL;

function Contact() {
    const [contacts, setContacts] = useState([]);
    const [message, setMessage] = useState("");
    const [editingContact, setEditingContact] = useState(null);
    const [editValues, setEditValues] = useState({});
    const navigate = useNavigate();

    const fetchContacts = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
            }

            const response = await axios.get(`${API_URL}/contacts`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setContacts(response.data);
        } catch (error) {

        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleDelete = async (contactId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage("Token Invalide");
                return;
            }

            await axios.delete(`${API_URL}/contacts/${contactId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setMessage("Contact supprimé avec succès");
            fetchContacts();
        } catch (error) {
            setMessage("Erreur lors de la suppression");
        }
    };

    const handleEdit = (contact) => {
        setEditingContact(contact._id);
        setEditValues({
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditValues(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (contactId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage("Token Invalide");
                return;
            }

            if (!editValues.firstName || !editValues.lastName || !editValues.phone) {
                setMessage("Tous les champs sont obligatoires");
                return;
            }

            if (editValues.phone.length < 10 || editValues.phone.length > 20) {
                setMessage("Le téléphone doit contenir entre 10 et 20 caractères");
                return;
            }

            await axios.patch(`${API_URL}/contacts/${contactId}`, editValues, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setMessage("Contact modifié avec succès");
            setEditingContact(null);
            fetchContacts();
        } catch (error) {
            setMessage("Erreur lors de la modification");
        }
    };

    const handleCancelEdit = () => {
        setEditingContact(null);
        setEditValues({});
    };

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    return (
        <div>
            <div>
                <h2>Liste des contacts</h2>
                <button onClick={handleLogout}>Se déconnecter</button>
            </div>
            {message && <p>{message}</p>}

            {contacts.length === 0 ? (
                <p>Aucun contact trouvé. Créez votre premier contact ci-dessous !</p>
            ) : (
                <ul>
                    {contacts.map(contact => (
                    <li key={contact._id}>
                        {editingContact === contact._id ? (
                            <div>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editValues.firstName}
                                    onChange={handleEditChange}
                                    placeholder="Prénom"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editValues.lastName}
                                    onChange={handleEditChange}
                                    placeholder="Nom"
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={editValues.phone}
                                    onChange={handleEditChange}
                                    placeholder="Téléphone (10-20 caractères)"
                                />
                                <br />
                                <button onClick={() => handleUpdate(contact._id)}>
                                    Sauvegarder
                                </button>
                                <button onClick={handleCancelEdit}>
                                    Annuler
                                </button>
                            </div>
                        ) : (
                            <div>
                                <strong>{contact.firstName} {contact.lastName}</strong> - {contact.phone}
                                <div>
                                    <button onClick={() => handleEdit(contact)}>
                                        Modifier
                                    </button>
                                    <button onClick={() => handleDelete(contact._id)}>
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                    ))}
                </ul>
            )}
            <NewContact onContactCreated={fetchContacts} />
        </div>
    );
}

export default Contact;

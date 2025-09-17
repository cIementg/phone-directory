import React, { useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

function NewContact({ onContactCreated }) {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        phone: "",
    });

    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!values.firstName || !values.lastName || !values.phone) {
            setMessage("Tous les champs sont obligatoires");
            return;
        }

        if (values.phone.length < 10 || values.phone.length > 20) {
            setMessage("Le téléphone doit contenir entre 10 et 20 caractères");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage("Vous devez être connecté pour créer un contact");
                return;
            }

            await axios.post(`${API_URL}/contacts`, values, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage("Contact créé !");
            setValues({ firstName: "", lastName: "", phone: "" });
            if (onContactCreated) {
                onContactCreated();
            }
        } catch (error) {
            setMessage("Erreur lors de la création");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Créer un nouveau contact</h2>
            <input
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Prénom"
            />
            <br />
            <input
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
                placeholder="Nom"
            />
            <br />
            <input
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleInputChange}
                placeholder="Téléphone (10-20 caractères)"
            />
            <br />
            <input type="submit" value="Créer le contact" />
            {message && <p>{message}</p>}
        </form>
    );
}

export default NewContact;

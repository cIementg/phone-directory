import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

function Register() {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!values.email || !values.password) {
            setMessage("Merci de remplir tous les champs");
            return;
        }

        try {
            await axios.post(`${API_URL}/auth/register`, values);
            setMessage("Utilisateur créé avec succès !");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setMessage("Erreur : " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                placeholder="Email"
            />
            <br />
            <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                placeholder="Password"
            />
            <br />
            <input type="submit" value="S'inscrire" />
            <br />
            {message && <p>{message}</p>}
            <p>
                Déjà un compte ? <a href="/login">Connectez-vous ici</a>
            </p>
        </form>
    );
}

export default Register;

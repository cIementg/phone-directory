import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState("");

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
            const response = await axios.post(`${API_URL}/auth/login`, values);
            
            if (response.data.user && response.data.user.token) {
                localStorage.setItem('token', response.data.user.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            
            navigate("/contact");
            console.log("Réponse API :", response.data);
        } catch (error) {
            setMessage("Erreur : " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Connexion</h2>
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
            <input type="submit" value="Se connecter" />
            <br />
            {message && <p>{message}</p>}
            <p>
                Pas de compte ? <Link to="/register">Inscrivez-vous ici</Link>
            </p>
        </form>
    );
}

export default Login;

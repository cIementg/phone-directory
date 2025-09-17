const authService = require("../services/authService");

async function register(req, res) {
    try {
        const { email, password } = req.body;
        const user = await authService.register(email, password);
        res.status(201).json({ message: "Utilisateur créé", user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password);
        res.status(200).json({ message: "Connexion réussie", user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { register, login };

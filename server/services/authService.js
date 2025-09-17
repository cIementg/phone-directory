const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret_key"
const SALT_ROUNDS = 10;


async function register(email, password) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Un utilisateur avec cet email existe déjà");

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    return {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
    };
}

async function login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Identifiant ou mot de passe incorrect");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Identifiant ou mot de passe incorrect");
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    return {
        id: user._id,
        email: user.email,
        token,
    };
}

module.exports = { register, login };

const User = require("../models/User");

async function findUserByEmail(email) {
    return await User.findOne({ email });
}

async function createUser(email, password) {
    return await User.create({email, password});
}

module.exports = { findUserByEmail, createUser };

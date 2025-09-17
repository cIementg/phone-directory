const userRepository = require("../repository/userRepository");

async function getUserByEmail(email) {
    const user = await userRepository.findUserByEmail(email);
    if (!user) throw new Error("Utilisateur non trouvé");
    return user;
}

module.exports = { getUserByEmail };

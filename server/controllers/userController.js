const userService = require("../services/userService");

async function getUserByEmail(req, res) {
    try {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        res.status(200).json({
            email: user.email,
            createdAt: user.createdAt
        });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

module.exports = { getUserByEmail };

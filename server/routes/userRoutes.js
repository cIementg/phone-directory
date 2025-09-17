const express = require("express");
const router = express.Router();
const { getUserByEmail } = require("../controllers/userController");
const { requireAuth } = require("../middleware/requireAuth");

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Récupère un utilisateur par email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: L'email de l'utilisateur
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get("/email/:email", requireAuth, getUserByEmail);

module.exports = router;

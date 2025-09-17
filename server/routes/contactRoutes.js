const express = require("express");
const router = express.Router();
const { getContacts, createContact, updateContact, deleteContact } = require("../controllers/contactController");
const { requireAuth } = require("../middleware/requireAuth");

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Gestion des contacts (CRUD)
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Récupérer tous les contacts (scope user)
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Liste des contacts récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   phone:
 *                     type: string
 *   post:
 *     summary: Créer un nouveau contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 20
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 */

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Mettre à jour partiellement un contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact mis à jour avec succès
 *       404:
 *         description: Contact non trouvé
 *   delete:
 *     summary: Supprimer un contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact à supprimer
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *       404:
 *         description: Contact non trouvé
 */

router.get("/", requireAuth, getContacts);
router.post("/", requireAuth, createContact);
router.patch("/:id", requireAuth, updateContact);
router.delete("/:id", requireAuth, deleteContact);

module.exports = router;

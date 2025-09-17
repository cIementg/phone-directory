const contactService = require("../services/contactService");

async function getContacts(req, res) {
    try {
        const userId = req.user.id;
        const contacts = await contactService.getAllContacts(userId);
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function createContact(req, res) {
    try {
        const { firstName, lastName, phone } = req.body;
        const userId = req.user.id;
        const contact = await contactService.createContact(firstName, lastName, phone, userId);
        res.status(201).json(contact);
    } catch (err) {
            res.status(400).json({ message: err.message })
    }
}

async function updateContact(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;
        const userId = req.user.id;
        const updated = await contactService.updateContact(id, updates, userId);
        if (!updated) return res.status(404).json({ message: "Contact non trouvé" });
        res.status(200).json(updated);
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: err.message });
        }
    }
}

async function deleteContact(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const deleted = await contactService.deleteContact(id, userId);
        if (!deleted) return res.status(404).json({ message: "Contact non trouvé" });
        res.status(200).json({ message: "Contact supprimé" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { getContacts, createContact, updateContact, deleteContact };

const contactRepository = require("../repository/contactRepository");

async function getAllContacts(userId) {
    return await contactRepository.findAllContacts(userId);
}

async function createContact(firstName, lastName, phone, userId) {
    return await contactRepository.createContact(firstName, lastName, phone, userId);
}

async function updateContact(id, updates, userId) {
    return await contactRepository.updateContactById(id, updates, userId);
}

async function deleteContact(id, userId) {
    return await contactRepository.deleteContactById(id, userId);
}

module.exports = { getAllContacts, createContact, updateContact, deleteContact };

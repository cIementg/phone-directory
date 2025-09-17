const Contact = require("../models/Contact");

async function findAllContacts(userId) {
    return await Contact.find({ userId });
}

async function createContact(firstName, lastName, phone, userId) {
    return await Contact.create({ firstName, lastName, phone, userId });
}

async function updateContactById(id, updates, userId) {
    return await Contact.findOneAndUpdate(
        { _id: id, userId }, 
        { $set: updates }, 
        { new: true }
    );
}

async function deleteContactById(id, userId) {
    return await Contact.findOneAndDelete({ _id: id, userId });
}

module.exports = {findAllContacts, createContact, updateContactById, deleteContactById};

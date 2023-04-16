const Contacts = require("../models/Contacts");

async function createContact(contact) {
    return Contacts.create(contact);
}

module.exports = {
    createContact
}
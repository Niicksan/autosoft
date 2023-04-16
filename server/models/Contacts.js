const { Schema, model } = require("mongoose");


const contactsSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: String, required: true, default: () => (new Date().toISOString()) }
});

contactsSchema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

contactsSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

contactsSchema.index({ subject: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Contacts = model('Contacts', contactsSchema);

module.exports = Contacts;
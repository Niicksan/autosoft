const { Schema, model, Types } = require("mongoose");


const serviceSchema = new Schema({
    title: { type: String, required: true },
    kilometers: { type: String, required: true },
    description: { type: String, required: true },
    vehicleId: { type: Types.ObjectId, ref: 'Vehicle' },
    ownerId: { type: Types.ObjectId, ref: 'User' },
    createdAt: { type: String, required: true, default: () => (new Date().toISOString()) },
    updatedAt: { type: String, required: true, default: () => (new Date().toISOString()) }
});

serviceSchema.index({ title: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

serviceSchema.index({ description: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Service = model('Service', serviceSchema);

module.exports = Service;
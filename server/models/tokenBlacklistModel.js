const { Schema, model } = require("mongoose");

const tokenBlacklistSchema = new Schema({
    token: { type: String, required: true, unique: true },
}, { timestamps: { createdAt: 'createdAt' } });

tokenBlacklistSchema.index({ token: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const TokenBlacklist = model('TokenBlacklist', tokenBlacklistSchema);

module.exports = TokenBlacklist;
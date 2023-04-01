const User = require('../models/User');
const TokenBlacklist = require('../models/tokenBlacklistModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'aGf23FgTahf124232HasdafdfaGj45hjh431235adsfgadFjaD';

async function register(email, companyName, password) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Имейл адресът е зает');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        companyName,
        hashedPassword
    });

    return createToken(user);
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Невалиден имейл или парола');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error('Невалиден имейл или парола');
    }

    return createToken(user);
}

async function logout(token) {
    await TokenBlacklist.create({ token });
}

function createToken({ _id, email, companyName }) {
    const payload = {
        _id,
        email,
        companyName
    };

    return {
        _id,
        email,
        companyName,
        authToken: jwt.sign(payload, JWT_SECRET, {
            expiresIn: '1d'
        })
    };
}

async function parseToken(token) {
    const isTokenBlacklisted = await TokenBlacklist.findOne({ token });

    if (isTokenBlacklisted) {
        return new Error('Token is blacklisted');
    }

    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    logout,
    parseToken
};
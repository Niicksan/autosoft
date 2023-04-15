const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        host: 'localhost',
        port: process.env.PORT || 3030,
        dbURL: 'mongodb://localhost:27017/autosoft',
        //dbURL: 'mongodb+srv://niksan:aiROMoGZxAy7vzJY@petfindme.ocortq9.mongodb.net/?retryWrites=true&w=majority',
        origin: ['http://localhost:3000']
    },
    production: {
        host: process.env.HOST,
        port: process.env.PORT || 3000,
        dbURL: process.env.DATABASE_URL,
        origin: ['https://autosoft.onrender.com']
    }
};

module.exports = config[env];
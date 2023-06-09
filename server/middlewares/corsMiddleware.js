module.exports = () => (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Authorization');

    next();
};
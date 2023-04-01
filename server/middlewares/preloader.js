// const { getBookById, getBookByIdRaw } = require("../services/bookService");
// TODO

// module.exports = (lean) => async (req, res, next) => {
//     if (lean) {
//         res.locals.book = await getBookById(req.params.id);

//     } else {
//         res.locals.book = await getBookByIdRaw(req.params.id);
//     }

//     next();
// };
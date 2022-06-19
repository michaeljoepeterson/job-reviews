const { buildError } = require("../helpers/build-error");

const errorHandler = (req, res, next) => {
    res.status(500);
    let error = res.err ? res.err : buildError({},'no error provided');
    console.error('Error: ',error);
    return res.json(error);
}

module.exports = {errorHandler};
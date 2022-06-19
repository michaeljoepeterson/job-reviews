const buildError = (error, message) => {
    return{
        message,
        error: error.message ? error.message : 'no error message'
    }
}

module.exports = {buildError};
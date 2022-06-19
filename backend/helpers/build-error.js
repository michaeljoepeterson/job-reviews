const buildError = (error, message) => {
    return{
        message,
        error
    }
}

module.exports = {buildError};
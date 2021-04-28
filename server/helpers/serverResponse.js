module.exports.success = (res, data, code=200) => {
    return res.status(code).json(data)
}

module.exports.error = (res, error, code=500) => {
    return res.status(code).json({
        error: error
    })
}
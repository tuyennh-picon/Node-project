'use strict'

const StatusCode = {
    OK: 200,
    CREATED: 201
}
const ReasonStatusCode = {
    OK: 'ok',
    CREATED: 'created'
}

class SuccessResponse {
    constructor({message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {}}) {
        this.message = !message ? reasonStatusCode: message
        this.status = statusCode
        this.metadata = metadata
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor({message, metadata}) {
        super({message, metadata})
    }
}

class Created extends SuccessResponse {
    constructor({message, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metadata}) {
        super({message, statusCode, reasonStatusCode, metadata})
    }
}

module.exports = {
    OK,
    Created,
    SuccessResponse
}
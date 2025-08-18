'use strict'

const StatusCode = {
    FORBIDEN: 403,
    CONFLICT: 409
}
const ReasonStatusCode = {
    FORBIDEN: 'Bad request error',
    CONFLICT: 'Conflict error'
}

const {
    StatusCodes,
    ReasonPhrases
} = require('../ultils/httpStatusCode')


class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, status = StatusCode.CONFLICT) {
        super(message, status)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDEN, status = StatusCode.FORBIDEN) {
        super(message, status)
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(message = ReasonPhrases.UNAUTHORIZED, status = StatusCodes.UNAUTHORIZED) {
        super(message, status)
    }
}


module.exports = {
    ConflictRequestError,
    AuthFailureError,
    BadRequestError
}
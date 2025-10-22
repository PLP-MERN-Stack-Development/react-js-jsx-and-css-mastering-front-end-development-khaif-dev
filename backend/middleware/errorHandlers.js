class AppError extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; //expect error from client
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Resource not found'){
        super(message, 404);
    }
}

class ValidationError extends AppError {
    constructor(message = 'Invalid data'){
        super(message, 400);
    }
}

class ConflictError extends AppError{
    constructor(message = 'Resource already exists'){
        super(message, 409);
    }
}

export { AppError, NotFoundError, ValidationError, ConflictError };
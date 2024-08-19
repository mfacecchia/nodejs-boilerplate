export default class AppError extends Error{
    constructor(message){
        super(message);
    }
}

export class GenericAppError extends AppError{
    constructor(message, statusCode, name = undefined){
        super(message);
        this.name = name || "GenericAppError";
        this.statusCode = statusCode;
    }
}

export class RedisConnectionError extends AppError{
    constructor(message){
        super(message);
        this.name = "RedisConnectionError";
        this.statusCode = 500;
    }
}

export class DatabaseConnectionError extends AppError{
    constructor(message){
        super(message);
        this.name = "DatabaseConnectionError";
        this.statusCode = 500;
    }
}

export class DatabaseQueryError extends AppError{
    constructor(message){
        super(message);
        this.name = "DatabaseQueryError";
        this.statusCode = 500;
    }
}

export class DataFetchError extends AppError{
    constructor(message){
        super(message);
        this.name = "DataFetchError";
        this.statusCode = 500;
    }
}

export class ValidationError extends AppError{
    constructor(errors, options, attributes, constraints, message){
        super(message || 'Data validation failed.');
        this.errors = errors;
        this.options = options;
        this.attributes = attributes;
        this.constraints = constraints;
        this.name = "ValidationError";
        this.statusCode = 403;
    }
}

export class UserNotFoundError extends AppError{
    constructor(message){
        super(message);
        this.name = "UserNotFoundError";
        this.statusCode = 404;
    }
}

export class UserFoundError extends AppError{
    constructor(message){
        super(message);
        this.name = "UserFoundError";
        this.statusCode = 400;
    }
}

export class JWTGenerationError extends AppError{
    constructor(message){
        super(message);
        this.name = "JWTGenerationError";
        this.statusCode = 500;
    }
}

export class JWTValidationError extends AppError{
    constructor(message){
        super(message);
        this.name = "JWTValidationError";
        this.statusCode = 401;
    }
}

export class CSRFGenerationError extends AppError{
    constructor(message){
        super(message);
        this.name = "CSRFGenerationError";
        this.statusCode = 500;
    }
}

export class CSRFValidationError extends AppError{
    constructor(message){
        super(message);
        this.name = "CSRFValidationError";
        this.statusCode = 401;
    }
}

export class InvalidCredentialsError extends AppError{
    constructor(message){
        super(message);
        this.name = "InvalidCredentialsError";
        this.statusCode = 401;
    }
}

export class PasswordHashError extends AppError{
    constructor(message){
        super(message);
        this.name = "PasswordHashError";
        this.statusCode = 500;
    }
}
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

export class NotFoundError extends AppError{
    constructor(message){
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

export class FoundError extends AppError{
    constructor(message){
        super(message);
        this.name = "FoundError";
        this.statusCode = 400;
    }
}

export class TokenGenerationError extends AppError{
    constructor(message){
        super(message);
        this.name = "TokenGenerationError";
        this.statusCode = 500;
    }
}

export class TokenValidationError extends AppError{
    constructor(message){
        super(message);
        this.name = "TokenValidationError";
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

export class PasswordMismatchError extends AppError{
    constructor(message){
        super(message);
        this.name = "PasswordMismatchError";
        this.statusCode = 400;
    }
}

export class PasswordReuseError extends AppError{
    constructor(message){
        super(message);
        this.name = "PasswordReuseError";
        this.statusCode = 400;
    }
}

export class ViewRenderError extends AppError{
    constructor(message){
        super(message);
        this.name = "ViewRenderError";
        this.statusCode = 500;
    }
}

export class MailingSystemConnectionError extends AppError{
    constructor(message){
        super(message);
        this.name = "MailingSystemConnectionError";
        this.statusCode = 500;
    }
}

export class EmailSendError extends AppError{
    constructor(message){
        super(message);
        this.name = "EmailSendError";
        this.statusCode = 500;
    }
}
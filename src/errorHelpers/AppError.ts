class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(statusCode: number, message: string, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        // Set the prototype explicitly to maintain the correct prototype chain
        Object.setPrototypeOf(this, new.target.prototype);

        // Capture the stack trace for debugging purposes
        Error.captureStackTrace(this);
    }
}

export default AppError
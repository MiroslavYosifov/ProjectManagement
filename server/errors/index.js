export function createAppError(status, message) {
    const error = new Error(message);
    error.status = status;
    error.name = 'AppError';
    return error;
}
export type AppError = Error & { status: number };

export function createAppError(status: number, message: string): AppError {
    const error = new Error(message) as AppError;
    error.status = status;
    error.name = 'AppError';
    return error;
}

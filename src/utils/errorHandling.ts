export interface ErrorResponseData {
    message?: string;
}

export interface ErrorResponse {
    data?: ErrorResponseData;
}

export interface AxiosErrorLike {
    response?: ErrorResponse;
}

export function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

export function isAxiosError(error: unknown): error is AxiosErrorLike {
    if (!isObject(error)) return false;
    if (!('response' in error)) return false;

    return isObject((error as Record<string, unknown>).response);
}

export function hasMessage(obj: unknown): obj is { message: string } {
    if (!isObject(obj)) return false;
    if (!('message' in obj)) return false;

    return typeof (obj as Record<string, unknown>).message === 'string';
}

export function getErrorMessage(error: unknown, fallback = 'An error occurred'): string {
    if (isAxiosError(error) && error.response?.data && hasMessage(error.response.data)) {
        return error.response.data.message!;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return fallback;
}

interface Pagination {
    page: number;
    take: number;
}

// This is a generic response class that can be used to standardize the response format of API endpoints. 
// It includes properties for success, message, data, error, errors, and pagination.
export class Response<T> {
    public success: boolean;
    public message: string;
    public data?: T;
    public error?: string;
    public errors?: string[];
    public pagination?: Pagination;

    constructor(init?: Partial<Response<T>>) {
        Object.assign(this, init);
    }

    public static success<T>(data: T, message?: string): Response<T> {
        const defaultMessage = 'Success';
        return new Response<T>({ success: true, data, message: message || defaultMessage });
    }

    public static error<T>(error: string, message?: string): Response<T> {
        const defaultMessage = 'Unexpected error occurred';
        return new Response<T>({ success: false, error, message: message || defaultMessage });
    }

    public static errors<T>(errors: string[], message?: string): Response<T> {
        const defaultMessage = 'Validation failed';
        return new Response<T>({ success: false, errors, message: message || defaultMessage });
    }

    public static paginate<T>(data: T[], page: number, take: number, message?: string): Response<T[]> {
        const pagination = { page, take };
        return new Response<T[]>({ success: true, data, pagination, message });
    }
}
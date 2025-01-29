interface Pagination {
    page: number;
    take: number;
}

export interface BaseResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    errors?: string[];
    pagination?: Pagination;
}

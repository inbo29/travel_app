export interface PaginatedResponse<T> {
    items: T[]
    total: number
    page: number
    hasMore: boolean
}

export interface ApiResponse<T> {
    data: T
    status: number
    message?: string
}

// Re-export all types from a central location
export * from './cms';

// Common types used across the application
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
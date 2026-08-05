import type { ApiResponse } from '#shared/types'

/**
 * 构造成功响应
 */
export function success<T>(data: T, message = 'ok'): ApiResponse<T> {
    return {
        code: 200,
        message,
        data,
    }
}

/**
 * 构造失败响应
 */
export function fail<T = null>(code: number, message: string, data: T = null as T): ApiResponse<T> {
    return {
        code,
        message,
        data,
    }
}

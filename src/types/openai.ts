// 서버 DTO / type과 동일한 구조

export interface ChatRequest {
  prompt: string
  timestamp: string
}

export interface ChatResponse {
  success: boolean
  message: string
}

// NestJS HTTP 에러 응답 (validation 등)
export interface ChatErrorResponse {
  message?: string | string[]
  statusCode?: number
}

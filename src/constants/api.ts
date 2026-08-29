// NestJS AppController 엔드포인트

export const API_ENDPOINTS = {
  root: '/',
  health: '/health',
  // chat: '/api/chat',
  chat: '/api/chat/rag',
} as const

export interface RootApiResponse {
  success: true
  message: string
  endpoints: {
    health: string
    chat: string
  }
}
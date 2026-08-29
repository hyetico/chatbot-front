import type { ChatErrorResponse } from '../types/openai'

export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

export function parseErrorMessage(data: ChatErrorResponse): string {
  if (Array.isArray(data.message)) {
    return data.message.join(', ')
  }
  return data.message ?? 'API 요청에 실패했습니다.'
}

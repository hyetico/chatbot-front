import axios from 'axios'
import { API_ENDPOINTS } from '../constants/api'
import type { ChatErrorResponse, ChatRequest, ChatResponse } from '../types/openai'
import { API_BASE, parseErrorMessage } from './openai.utils'

export async function sendChatMessage(
  prompt: string,
  timestamp: string,
): Promise<string> {
  const body: ChatRequest = { prompt, timestamp }

  try {
    console.log('API request body:', body)

    const { data } = await axios.post<ChatResponse>(
      `${API_BASE}${API_ENDPOINTS.chat}`,
      body,
    )

    if (!data.success) {
      throw new Error(data.message || 'API 요청에 실패했습니다.')
    }

    return data.message || '응답을 받지 못했습니다.'
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorData = error.response.data as ChatErrorResponse | ChatResponse
        if ('success' in errorData && !errorData.success) {
          throw new Error(errorData.message)
        }
        throw new Error(parseErrorMessage(errorData as ChatErrorResponse))
      }

      if (error.request) {
        throw new Error('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.')
      }

      throw new Error(error.message ?? 'API 요청을 처리할 수 없습니다.')
    }

    throw new Error('알 수 없는 오류가 발생했습니다.')
  }
}

export type MessageRole = 'user' | 'assistant' | 'error'

export type Message = {
  id: string
  role: MessageRole
  content: string
  createdAt: Date
}

export function formatMessageTime(date: Date): string {
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

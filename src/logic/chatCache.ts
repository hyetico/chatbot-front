import type { Message } from '../types/chat'

const CACHE_KEY = 'chatbot-messages'
const CONVERSATION_ID_KEY = 'chatbot-conversation-id'

type CachedMessage = {
  id: string
  role: Message['role']
  content: string
  createdAt: string
}

export function loadConversationId(): string {
  const saved = localStorage.getItem(CONVERSATION_ID_KEY)
  if (saved) return saved

  const newId = new Date().toISOString()
  localStorage.setItem(CONVERSATION_ID_KEY, newId)
  return newId
}

export function loadCachedMessages(): Message[] {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw) as CachedMessage[]
    return parsed.map((message) => ({
      ...message,
      createdAt: new Date(message.createdAt),
    }))
  } catch {
    return []
  }
}

export function saveCachedMessages(messages: Message[]): void {
  const cacheTarget = messages.filter((message) => message.role !== 'error')

  if (cacheTarget.length === 0) {
    localStorage.removeItem(CACHE_KEY)
    return
  }

  const serialized: CachedMessage[] = cacheTarget.map((message) => ({
    id: message.id,
    role: message.role,
    content: message.content,
    createdAt: message.createdAt.toISOString(),
  }))

  localStorage.setItem(CACHE_KEY, JSON.stringify(serialized))
}

export function clearCachedMessages(): void {
  localStorage.removeItem(CACHE_KEY)
  localStorage.removeItem(CONVERSATION_ID_KEY)
}

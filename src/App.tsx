import { useEffect, useState } from 'react'
import ChatInput from './components/ChatInput/ChatInput'
import ChatResponse from './components/ChatResponse/ChatResponse'
import { loadCachedMessages, loadConversationId, saveCachedMessages } from './logic/chatCache'
import { sendChatMessage } from './logic/openai.axios'
import type { Message } from './types/chat'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(() => loadCachedMessages())
  const [loading, setLoading] = useState(false)
  const [conversationId] = useState(() => loadConversationId())

  useEffect(() => {
    saveCachedMessages(messages)
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const message = input.trim()
    if (!message || loading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: message,
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const content = await sendChatMessage(message, conversationId)

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content,
        createdAt: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'error',
        content: err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.',
        createdAt: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>Chatbot</h1>
      <ChatResponse messages={messages} loading={loading} />
      <ChatInput
        value={input}
        loading={loading}
        onChange={setInput}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default App

import { useEffect, useRef } from 'react'
import { formatMessageTime, type Message } from '../../types/chat'
import './ChatResponse.css'

type ChatResponseProps = {
  messages: Message[]
  loading: boolean
}

function ChatResponse({ messages, loading }: ChatResponseProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="chat-response">
      {messages.length === 0 && !loading && (
        <p className="chat-response__placeholder">대화를 시작해 보세요.</p>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat-message chat-message--${message.role}`}
        >
          <div className="chat-message__bubble">
            <p className="chat-message__text">{message.content}</p>
            <time className="chat-message__time" dateTime={message.createdAt.toISOString()}>
              {formatMessageTime(message.createdAt)}
            </time>
          </div>
        </div>
      ))}

      {loading && (
        <div className="chat-message chat-message--assistant">
          <div className="chat-message__bubble chat-message__bubble--loading">
            <p className="chat-message__text">응답 생성 중...</p>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
      {/* <div ref={bottomRef} style={{ backgroundColor: 'red', height: '4px' }} /> */}
    </div>
  )
}

export default ChatResponse

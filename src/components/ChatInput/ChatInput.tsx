import { useEffect, useRef } from 'react'
import './ChatInput.css'

type ChatInputProps = {
  value: string
  loading: boolean
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

function ChatInput({ value, loading, onChange, onSubmit }: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // 로딩이 끝나면 입력창에 커서 자동 포커스
  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus()
    }
  }, [loading])

  return (
    <form className="chat-input" onSubmit={onSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="메시지를 입력하세요"
        disabled={loading}
      />
      <button type="submit" disabled={loading || !value.trim()}>
        {loading ? '전송 중...' : 'Submit'}
      </button>
    </form>
  )
}

export default ChatInput

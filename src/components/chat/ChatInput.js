'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Square } from 'lucide-react'
import { IconButton } from '@/components/ui/IconButton'
import { useChat } from '@/contexts/ChatContext'
import { handleKeyboardShortcut } from '@/lib/utils'

export function ChatInput({ onSendMessage, disabled = false }) {
  const [message, setMessage] = useState('')
  const [isComposing, setIsComposing] = useState(false)
  const textareaRef = useRef(null)
  const { isTyping } = useChat()

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
    }
  }, [message])

  // Focus textarea on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  // Listen for example message events from WelcomeScreen
  useEffect(() => {
    const handleExampleMessage = (event) => {
      const { message } = event.detail
      setMessage(message)
      // Auto-send the message after a short delay
      setTimeout(() => {
        if (!disabled && !isTyping) {
          onSendMessage(message)
          setMessage('')
        }
      }, 100)
    }

    window.addEventListener('sendExampleMessage', handleExampleMessage)
    return () => {
      window.removeEventListener('sendExampleMessage', handleExampleMessage)
    }
  }, [disabled, isTyping, onSendMessage])

  const handleSubmit = () => {
    if (!message.trim() || disabled || isTyping) return

    onSendMessage(message.trim())
    setMessage('')

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e) => {
    // Handle composition events (for IME input)
    if (isComposing) return

    const shortcuts = [
      {
        key: 'enter',
        ctrl: false,
        meta: false,
        alt: false,
        shift: false,
        action: handleSubmit
      }
    ]

    // Don't submit on Shift+Enter (allow new line)
    if (e.key === 'Enter' && !e.shiftKey) {
      handleKeyboardShortcut(e, shortcuts)
    }
  }

  const handleCompositionStart = () => {
    setIsComposing(true)
  }

  const handleCompositionEnd = () => {
    setIsComposing(false)
  }

  const canSend = message.trim() && !disabled && !isTyping

  return (
    <div className="border-t border-border bg-background p-3 sm:p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-2 sm:gap-3 bg-input-bg border border-input-border rounded-lg p-2 sm:p-3">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder={isTyping ? "ChatGPT is typing..." : "Message ChatGPT..."}
            disabled={disabled || isTyping}
            className="flex-1 resize-none bg-transparent border-none outline-none placeholder:text-text-muted text-foreground min-h-[24px] max-h-[200px] leading-6"
            rows={1}
            aria-label="Message input"
            aria-describedby="input-help"
          />

          <IconButton
            onClick={handleSubmit}
            disabled={!canSend}
            size="sm"
            variant={canSend ? 'solid' : 'ghost'}
            className={`
              flex-shrink-0 transition-all duration-200
              ${canSend
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'text-text-muted cursor-not-allowed'
              }
            `}
            title={canSend ? "Send message" : "Enter a message to send"}
          >
            {isTyping ? <Square size={16} /> : <Send size={16} />}
          </IconButton>
        </div>

        <div id="input-help" className="text-xs text-text-muted text-center mt-2">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  )
}

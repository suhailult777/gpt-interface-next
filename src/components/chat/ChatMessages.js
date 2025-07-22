'use client'

import { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'
import { WelcomeScreen } from './WelcomeScreen'
import { useChat } from '@/contexts/ChatContext'

export function ChatMessages({ onRegenerate }) {
  const { currentConversation, isTyping } = useChat()
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentConversation?.messages, isTyping])

  if (!currentConversation) {
    return <WelcomeScreen />
  }

  const messages = currentConversation.messages || []

  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      <div className="max-w-4xl mx-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                New Conversation
              </h3>
              <p className="text-text-secondary">
                Send a message to start chatting with ChatGPT.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-0">
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                isLast={index === messages.length - 1}
                conversationId={currentConversation.id}
                onRegenerate={onRegenerate}
              />
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <MessageBubble
                message={{
                  id: 'typing',
                  role: 'assistant',
                  content: '',
                  timestamp: new Date().toISOString(),
                  isTyping: true
                }}
              />
            )}
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

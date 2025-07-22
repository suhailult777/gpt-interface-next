'use client'

import { useState } from 'react'
import { Copy, Check, User, Bot } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/Avatar'
import { IconButton } from '@/components/ui/IconButton'
import { ResponseControls } from './ResponseControls'
import { copyToClipboard, formatTimestamp } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from '@/contexts/ThemeContext'

export function MessageBubble({
  message,
  isLast = false,
  conversationId,
  onRegenerate
}) {
  const [copied, setCopied] = useState(false)
  const { isDark } = useTheme()
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''

      if (!inline && language) {
        return (
          <div className="relative group">
            <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 text-xs rounded-t-md">
              <span>{language}</span>
              <button
                onClick={() => copyToClipboard(String(children).replace(/\n$/, ''))}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700 p-1 rounded"
              >
                <Copy size={14} />
              </button>
            </div>
            <SyntaxHighlighter
              style={isDark ? oneDark : oneLight}
              language={language}
              PreTag="div"
              className="!mt-0 !rounded-t-none"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          </div>
        )
      }

      return (
        <code
          className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      )
    },

    pre({ children }) {
      return <div className="overflow-x-auto">{children}</div>
    },

    p({ children }) {
      return <p className="mb-2 last:mb-0">{children}</p>
    },

    ul({ children }) {
      return <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
    },

    ol({ children }) {
      return <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
    },

    li({ children }) {
      return <li className="ml-2">{children}</li>
    },

    blockquote({ children }) {
      return (
        <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-2">
          {children}
        </blockquote>
      )
    },

    h1({ children }) {
      return <h1 className="text-xl font-bold mb-2">{children}</h1>
    },

    h2({ children }) {
      return <h2 className="text-lg font-bold mb-2">{children}</h2>
    },

    h3({ children }) {
      return <h3 className="text-base font-bold mb-2">{children}</h3>
    },

    a({ href, children }) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {children}
        </a>
      )
    }
  }

  return (
    <div className={`group relative ${isUser ? 'ml-auto max-w-[90%] sm:max-w-[80%]' : 'mr-auto'}`}>
      <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4">
        {/* Avatar */}
        <Avatar className="flex-shrink-0">
          <AvatarFallback className={isUser ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}>
            {isUser ? <User size={16} /> : <Bot size={16} />}
          </AvatarFallback>
        </Avatar>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-foreground">
              {isUser ? 'You' : 'ChatGPT'}
            </span>
            <span className="text-xs text-text-muted">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>

          <div className={`
            rounded-lg px-4 py-3 
            ${isUser
              ? 'bg-user-message text-foreground'
              : 'bg-assistant-message text-foreground'
            }
          `}>
            {isAssistant ? (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown components={MarkdownComponents}>
                  {message.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-3">
            {/* Response Controls (left side for assistant messages) */}
            {isAssistant && isLast && (
              <ResponseControls
                message={message}
                conversationId={conversationId}
                onRegenerate={onRegenerate}
                className="opacity-0 group-hover:opacity-100 transition-opacity order-2 sm:order-1"
              />
            )}

            {/* Copy Button (right side) */}
            <div className={`flex justify-end ${isAssistant && isLast ? 'sm:ml-auto order-1 sm:order-2' : ''}`}>
              <IconButton
                onClick={handleCopy}
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                title="Copy message"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      {/* Typing Indicator */}
      {message.isTyping && (
        <div className="flex items-center gap-3 p-4 pt-0">
          <div className="w-10" /> {/* Avatar spacer */}
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      )}
    </div>
  )
}

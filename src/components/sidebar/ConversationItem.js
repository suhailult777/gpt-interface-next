'use client'

import { useState } from 'react'
import { MessageSquare, Trash2, MoreHorizontal } from 'lucide-react'
import { IconButton } from '@/components/ui/IconButton'
import { useChat } from '@/contexts/ChatContext'
import { formatTimestamp, cn } from '@/lib/utils'

export function ConversationItem({ conversation, isActive }) {
  const [showActions, setShowActions] = useState(false)
  const { setCurrentConversation, deleteConversation } = useChat()

  const handleClick = () => {
    setCurrentConversation(conversation.id)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this conversation?')) {
      deleteConversation(conversation.id)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault()
      handleDelete(e)
    }
  }

  const handleMouseEnter = () => {
    setShowActions(true)
  }

  const handleMouseLeave = () => {
    setShowActions(false)
  }

  return (
    <div
      className={cn(
        'group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        isActive
          ? 'bg-hover text-foreground'
          : 'text-text-secondary hover:bg-hover hover:text-foreground'
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="button"
      aria-label={`Select conversation: ${conversation.title}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Icon */}
      <MessageSquare size={16} className="flex-shrink-0" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">
          {conversation.title}
        </div>
        <div className="text-xs text-text-muted">
          {formatTimestamp(conversation.updatedAt)}
        </div>
      </div>

      {/* Actions */}
      {(showActions || isActive) && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <IconButton
            onClick={handleDelete}
            size="sm"
            variant="ghost"
            className="opacity-0 group-hover:opacity-100 transition-opacity text-text-muted hover:text-red-500"
            title="Delete conversation"
          >
            <Trash2 size={14} />
          </IconButton>
        </div>
      )}
    </div>
  )
}

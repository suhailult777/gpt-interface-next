'use client'

import { Menu, MoreVertical } from 'lucide-react'
import { IconButton } from '@/components/ui/IconButton'
import { useChat } from '@/contexts/ChatContext'

export function ChatHeader() {
  const { currentConversation, toggleSidebar, sidebarOpen } = useChat()

  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-background">
      <div className="flex items-center gap-3">
        {/* Sidebar toggle (mobile) */}
        <IconButton
          onClick={toggleSidebar}
          variant="ghost"
          className="lg:hidden"
          title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Menu size={20} />
        </IconButton>

        {/* Conversation title */}
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            {currentConversation?.title || 'ChatGPT'}
          </h1>
          {currentConversation && (
            <p className="text-sm text-text-secondary">
              {currentConversation.messages.length} messages
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <IconButton
          variant="ghost"
          title="More options"
        >
          <MoreVertical size={20} />
        </IconButton>
      </div>
    </div>
  )
}

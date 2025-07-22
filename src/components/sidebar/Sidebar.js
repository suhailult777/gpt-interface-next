'use client'

import { useState } from 'react'
import { Plus, Search, Menu, X, Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Input } from '@/components/ui/Input'
import { ConversationItem } from './ConversationItem'
import { useChat } from '@/contexts/ChatContext'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('')
  const {
    conversations,
    currentConversationId,
    createNewConversation,
    sidebarOpen,
    toggleSidebar,
    setSidebarOpen
  } = useChat()
  const { theme, setTheme, isDark } = useTheme()

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleNewChat = () => {
    createNewConversation()
  }

  const themeOptions = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' }
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'fixed left-0 top-0 h-full w-80 bg-sidebar-bg border-r border-border z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-80 md:w-72 sm:w-64',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h1 className="text-lg font-semibold text-foreground">ChatGPT</h1>
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <div className="flex items-center bg-hover rounded-lg p-1">
                {themeOptions.map(({ value, icon: Icon, label }) => (
                  <IconButton
                    key={value}
                    onClick={() => setTheme(value)}
                    size="sm"
                    variant={theme === value ? 'solid' : 'ghost'}
                    className={cn(
                      'h-8 w-8',
                      theme === value && 'bg-primary text-white'
                    )}
                    title={label}
                  >
                    <Icon size={14} />
                  </IconButton>
                ))}
              </div>

              {/* Close button (mobile only) */}
              <IconButton
                onClick={toggleSidebar}
                size="sm"
                variant="ghost"
                className="lg:hidden"
              >
                <X size={16} />
              </IconButton>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <Button
              onClick={handleNewChat}
              className="w-full justify-start gap-3"
              variant="outline"
            >
              <Plus size={16} />
              New Chat
            </Button>
          </div>

          {/* Search */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div
            className="flex-1 overflow-y-auto px-4 pb-4"
            role="navigation"
            aria-label="Conversation history"
          >
            {filteredConversations.length === 0 ? (
              <div className="text-center text-text-muted py-8">
                {searchQuery ? 'No conversations found' : 'No conversations yet'}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={conversation.id === currentConversationId}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="text-xs text-text-muted text-center">
              ChatGPT Clone v1.0
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

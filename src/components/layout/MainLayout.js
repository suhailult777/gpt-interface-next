'use client'

import { useEffect } from 'react'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { KeyboardShortcuts } from '@/components/ui/KeyboardShortcuts'
import { useChat } from '@/contexts/ChatContext'
import { useTheme } from '@/contexts/ThemeContext'
import { handleKeyboardShortcut } from '@/lib/utils'

export function MainLayout() {
  const { toggleSidebar, createNewConversation } = useChat()
  const { toggleTheme } = useTheme()

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      const shortcuts = [
        {
          key: 'b',
          ctrl: true,
          meta: false,
          alt: false,
          shift: false,
          action: toggleSidebar
        },
        {
          key: 'n',
          ctrl: true,
          meta: false,
          alt: false,
          shift: false,
          action: createNewConversation
        },
        {
          key: 'd',
          ctrl: true,
          meta: false,
          alt: false,
          shift: false,
          action: toggleTheme
        }
      ]

      handleKeyboardShortcut(e, shortcuts)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar, createNewConversation, toggleTheme])

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <ChatInterface />
      </div>
      <KeyboardShortcuts />
    </div>
  )
}

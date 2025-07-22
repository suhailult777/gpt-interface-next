'use client'

import { useState, useEffect } from 'react'
import { Keyboard, X } from 'lucide-react'
import { IconButton } from './IconButton'
import { Button } from './Button'

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  const shortcuts = [
    { key: 'Ctrl + B', description: 'Toggle sidebar' },
    { key: 'Ctrl + N', description: 'New conversation' },
    { key: 'Ctrl + D', description: 'Toggle dark mode' },
    { key: 'Enter', description: 'Send message' },
    { key: 'Shift + Enter', description: 'New line in message' },
    { key: 'Escape', description: 'Close dialogs' },
    { key: 'Tab', description: 'Navigate between elements' },
    { key: 'Space/Enter', description: 'Activate focused element' },
    { key: 'Delete/Backspace', description: 'Delete focused conversation' }
  ]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
      if (e.key === '?' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isOpen) {
    return (
      <IconButton
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size="sm"
        title="Keyboard shortcuts (Ctrl + ?)"
        className="fixed bottom-4 right-4 z-50 bg-background border border-border shadow-lg"
      >
        <Keyboard size={16} />
      </IconButton>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Keyboard Shortcuts</h2>
          <IconButton
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
          >
            <X size={16} />
          </IconButton>
        </div>
        
        <div className="p-4 space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-text-secondary">{shortcut.description}</span>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono border border-border">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-border">
          <Button
            onClick={() => setIsOpen(false)}
            className="w-full"
            variant="outline"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

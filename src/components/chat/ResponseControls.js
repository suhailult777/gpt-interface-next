'use client'

import { RotateCcw, Square } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useChat } from '@/contexts/ChatContext'

export function ResponseControls({
  message,
  conversationId,
  onRegenerate,
  className = ''
}) {
  const { isTyping, stopGeneration, canRegenerate } = useChat()

  const isLastAssistantMessage = message?.role === 'assistant'
  const showRegenerateButton = isLastAssistantMessage && canRegenerate && !isTyping
  const showStopButton = isTyping

  const handleRegenerate = () => {
    if (onRegenerate && conversationId && message?.id) {
      onRegenerate(conversationId, message.id)
    }
  }

  const handleStop = () => {
    stopGeneration()
  }

  if (!showRegenerateButton && !showStopButton) {
    return null
  }

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 ${className}`}>
      {showStopButton && (
        <Button
          onClick={handleStop}
          variant="outline"
          size="sm"
          className="h-8 px-3 text-xs bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 dark:bg-red-950 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900 w-full sm:w-auto"
        >
          <Square size={14} className="mr-1.5 flex-shrink-0" />
          <span className="hidden sm:inline">Stop generating</span>
          <span className="sm:hidden">Stop</span>
        </Button>
      )}

      {showRegenerateButton && (
        <Button
          onClick={handleRegenerate}
          variant="outline"
          size="sm"
          className="h-8 px-3 text-xs w-full sm:w-auto"
        >
          <RotateCcw size={14} className="mr-1.5 flex-shrink-0" />
          <span className="hidden sm:inline">Regenerate response</span>
          <span className="sm:hidden">Regenerate</span>
        </Button>
      )}
    </div>
  )
}

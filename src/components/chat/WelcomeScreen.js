'use client'

import { MessageSquare, Lightbulb, Code, BookOpen, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useChat } from '@/contexts/ChatContext'

export function WelcomeScreen() {
  const { createNewConversation } = useChat()

  const examples = [
    {
      icon: MessageSquare,
      title: "Explain quantum computing",
      subtitle: "in simple terms"
    },
    {
      icon: Lightbulb,
      title: "Got any creative ideas",
      subtitle: "for a 10 year old's birthday?"
    },
    {
      icon: Code,
      title: "How do I make an HTTP request",
      subtitle: "in Javascript?"
    },
    {
      icon: BookOpen,
      title: "Help me write a short story",
      subtitle: "about a magical forest"
    }
  ]

  const handleExampleClick = (example) => {
    const conversationId = createNewConversation()
    // Auto-send the example message
    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('sendExampleMessage', {
        detail: { message: `${example.title} ${example.subtitle}` }
      }))
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full text-center">
        {/* Logo/Title */}
        <div className="mb-8 sm:mb-12">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            <div className="absolute -top-1 -right-1">
              <Badge variant="success" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
                AI
              </Badge>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-2 sm:mb-3">
            Welcome to ChatGPT
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl font-medium">
            How can I help you today?
          </p>
        </div>

        {/* Example prompts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {examples.map((example, index) => {
            const Icon = example.icon
            return (
              <Button
                key={index}
                onClick={() => handleExampleClick(example)}
                variant="outline"
                className="p-4 sm:p-6 h-auto border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-950/20 transition-all duration-200 text-left group"
              >
                <div className="flex items-start gap-3 sm:gap-4 w-full">
                  <div className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors flex-shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors mb-1">
                      {example.title}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {example.subtitle}
                    </div>
                  </div>
                </div>
              </Button>
            )
          })}
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">Examples</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400 space-y-2">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                &ldquo;Explain quantum computing in simple terms&rdquo;
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                &ldquo;Got any creative ideas for a 10 year old&apos;s birthday?&rdquo;
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                &ldquo;How do I make an HTTP request in Javascript?&rdquo;
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">Capabilities</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400 space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>Remembers what user said earlier in the conversation</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>Allows user to provide follow-up corrections</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>Trained to decline inappropriate requests</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">Limitations</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400 space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>May occasionally generate incorrect information</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>May occasionally produce harmful instructions or biased content</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>Limited knowledge of world and events after 2021</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

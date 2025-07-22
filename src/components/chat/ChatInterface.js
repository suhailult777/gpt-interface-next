'use client'

import { useState } from 'react'
import { ChatHeader } from './ChatHeader'
import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'
import { useChat } from '@/contexts/ChatContext'
import { typewriterEffect, sleep } from '@/lib/utils'

// Mock responses for demonstration
const mockResponses = [
  "Hello! I'm ChatGPT, an AI assistant created by OpenAI. I'm here to help you with a wide variety of tasks including:\n\n• **Answering questions** on diverse topics\n• **Writing assistance** for essays, emails, and creative content\n• **Code help** in multiple programming languages\n• **Analysis and research** support\n• **Math and problem-solving**\n• **Creative projects** like stories and brainstorming\n\nWhat would you like to explore today?",

  "That's a fascinating question! Let me break this down for you:\n\n## Key Points to Consider\n\n1. **Primary Factor**: This is the most important element to understand\n2. **Secondary Considerations**: These build upon the foundation\n3. **Practical Implications**: How this applies in real-world scenarios\n\n### Additional Context\n\nIt's worth noting that this topic has evolved significantly over time. The current understanding incorporates both traditional approaches and modern innovations.\n\nWould you like me to dive deeper into any specific aspect?",

  "I'd be happy to help you with that! Here's a comprehensive example:\n\n```javascript\n// Modern JavaScript example\nconst fetchUserData = async (userId) => {\n  try {\n    const response = await fetch(`/api/users/${userId}`);\n    \n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    \n    const userData = await response.json();\n    return userData;\n  } catch (error) {\n    console.error('Error fetching user data:', error);\n    throw error;\n  }\n};\n\n// Usage\nfetchUserData(123)\n  .then(user => console.log('User:', user))\n  .catch(err => console.error('Failed to load user:', err));\n```\n\nThis example demonstrates:\n- **Async/await** for cleaner asynchronous code\n- **Error handling** with try/catch\n- **HTTP status checking**\n- **Proper error propagation**\n\nWould you like me to explain any part in more detail?",

  "Excellent question! Here's my perspective:\n\n> *\"The future belongs to those who believe in the beauty of their dreams.\"* - Eleanor Roosevelt\n\nThis quote captures something profound about human potential and vision. When we combine belief with action, remarkable things become possible.\n\n### Why This Matters\n\n- **Vision drives innovation**: Great achievements start with someone imagining what could be\n- **Belief fuels persistence**: When challenges arise, conviction helps us push through\n- **Dreams inspire others**: Shared visions can mobilize communities and create movements\n\n### Practical Application\n\nConsider how this applies to your own goals. What dreams are you nurturing? How might you take the next step toward making them reality?\n\nI'd love to hear your thoughts on this!",

  "I'm excited to help you understand this topic! Let me provide a comprehensive overview:\n\n## Core Concepts\n\n### Foundation Level\n- **Concept Alpha**: The fundamental building block that everything else relies on\n- **Concept Beta**: Extends the foundation with practical applications\n- **Concept Gamma**: Advanced integration that ties everything together\n\n### Real-World Applications\n\n1. **Personal Development**\n   - Daily habits and routines\n   - Goal setting and achievement\n   - Continuous learning strategies\n\n2. **Professional Context**\n   - Team collaboration\n   - Project management\n   - Leadership development\n\n3. **Academic Pursuits**\n   - Research methodologies\n   - Critical thinking skills\n   - Knowledge synthesis\n\n### Next Steps\n\nTo deepen your understanding, I recommend:\n- Starting with the foundational concepts\n- Practicing with real examples\n- Connecting theory to your specific interests\n\nWhat area would you like to explore first?",

  "That's a wonderful topic to explore! Let me share some insights:\n\n## Understanding the Landscape\n\nThis field has seen remarkable evolution in recent years. What once seemed impossible is now becoming routine, thanks to advances in technology and methodology.\n\n### Current Trends\n\n- **Innovation Acceleration**: New developments are happening faster than ever\n- **Democratization**: Tools and knowledge are becoming more accessible\n- **Integration**: Different fields are combining in unexpected ways\n\n### Challenges and Opportunities\n\n**Challenges:**\n- Keeping up with rapid change\n- Ensuring ethical considerations\n- Managing complexity\n\n**Opportunities:**\n- Unprecedented problem-solving capabilities\n- Global collaboration potential\n- Creative expression possibilities\n\n### Looking Forward\n\nThe most exciting aspect is how this opens doors for creative problem-solving. Whether you're interested in the technical details, practical applications, or broader implications, there's something here for everyone.\n\nWhat specific angle interests you most?"
]

export function ChatInterface() {
  const {
    currentConversation,
    addMessage,
    updateMessage,
    deleteMessage,
    setIsTyping,
    setGenerationController,
    setCanRegenerate,
    createNewConversation
  } = useChat()

  const handleSendMessage = async (content) => {
    let conversationId = currentConversation?.id

    // Create new conversation if none exists
    if (!conversationId) {
      conversationId = createNewConversation()
    }

    // Add user message
    const userMessageId = addMessage(conversationId, {
      role: 'user',
      content
    })

    // Simulate AI response
    await simulateAIResponse(conversationId)
  }

  const simulateAIResponse = async (conversationId) => {
    // Create abort controller for stopping generation
    const controller = new AbortController()
    setGenerationController(controller)

    // Set typing indicator
    setIsTyping(true)
    setCanRegenerate(false)

    try {
      // Simulate thinking time
      await sleep(1000 + Math.random() * 2000)

      // Check if aborted
      if (controller.signal.aborted) return

      // Get random response
      const response = mockResponses[Math.floor(Math.random() * mockResponses.length)]

      // Add assistant message
      const assistantMessageId = addMessage(conversationId, {
        role: 'assistant',
        content: ''
      })

      // Clear typing indicator
      setIsTyping(false)

      // Simulate typewriter effect with abort support
      await typewriterEffect(
        response,
        (partialContent) => {
          if (!controller.signal.aborted) {
            updateMessage(conversationId, assistantMessageId, {
              content: partialContent
            })
          }
        },
        20, // typing speed
        controller.signal
      )

      // Enable regenerate if not aborted
      if (!controller.signal.aborted) {
        setCanRegenerate(true)
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error generating response:', error)
      }
      setIsTyping(false)
    } finally {
      setGenerationController(null)
    }
  }

  const handleRegenerate = async (conversationId, messageId) => {
    // Delete the message to regenerate
    deleteMessage(conversationId, messageId)

    // Generate a new response
    await simulateAIResponse(conversationId)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader />
      <ChatMessages onRegenerate={handleRegenerate} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}

'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import { generateId, generateConversationTitle, saveToLocalStorage, loadFromLocalStorage } from '@/lib/utils'

const ChatContext = createContext()

// Action types
const ACTIONS = {
  SET_CONVERSATIONS: 'SET_CONVERSATIONS',
  ADD_CONVERSATION: 'ADD_CONVERSATION',
  UPDATE_CONVERSATION: 'UPDATE_CONVERSATION',
  DELETE_CONVERSATION: 'DELETE_CONVERSATION',
  SET_CURRENT_CONVERSATION: 'SET_CURRENT_CONVERSATION',
  ADD_MESSAGE: 'ADD_MESSAGE',
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',
  DELETE_MESSAGE: 'DELETE_MESSAGE',
  SET_IS_TYPING: 'SET_IS_TYPING',
  SET_SIDEBAR_OPEN: 'SET_SIDEBAR_OPEN',
  SET_GENERATION_CONTROLLER: 'SET_GENERATION_CONTROLLER',
  SET_CAN_REGENERATE: 'SET_CAN_REGENERATE'
}

// Initial state
const initialState = {
  conversations: [],
  currentConversationId: null,
  isTyping: false,
  sidebarOpen: true,
  generationController: null, // AbortController for stopping generation
  canRegenerate: false // Whether the last message can be regenerated
}

// Reducer function
function chatReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload
      }

    case ACTIONS.ADD_CONVERSATION:
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
        currentConversationId: action.payload.id
      }

    case ACTIONS.UPDATE_CONVERSATION:
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.id ? { ...conv, ...action.payload.updates } : conv
        )
      }

    case ACTIONS.DELETE_CONVERSATION:
      const filteredConversations = state.conversations.filter(conv => conv.id !== action.payload)
      const newCurrentId = state.currentConversationId === action.payload
        ? (filteredConversations.length > 0 ? filteredConversations[0].id : null)
        : state.currentConversationId

      return {
        ...state,
        conversations: filteredConversations,
        currentConversationId: newCurrentId
      }

    case ACTIONS.SET_CURRENT_CONVERSATION:
      return {
        ...state,
        currentConversationId: action.payload
      }

    case ACTIONS.ADD_MESSAGE:
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.conversationId
            ? {
              ...conv,
              messages: [...conv.messages, action.payload.message],
              updatedAt: new Date().toISOString()
            }
            : conv
        )
      }

    case ACTIONS.UPDATE_MESSAGE:
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.conversationId
            ? {
              ...conv,
              messages: conv.messages.map(msg =>
                msg.id === action.payload.messageId
                  ? { ...msg, ...action.payload.updates }
                  : msg
              )
            }
            : conv
        )
      }

    case ACTIONS.DELETE_MESSAGE:
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.conversationId
            ? {
              ...conv,
              messages: conv.messages.filter(msg => msg.id !== action.payload.messageId)
            }
            : conv
        )
      }

    case ACTIONS.SET_IS_TYPING:
      return {
        ...state,
        isTyping: action.payload
      }

    case ACTIONS.SET_GENERATION_CONTROLLER:
      return {
        ...state,
        generationController: action.payload
      }

    case ACTIONS.SET_CAN_REGENERATE:
      return {
        ...state,
        canRegenerate: action.payload
      }

    case ACTIONS.SET_SIDEBAR_OPEN:
      return {
        ...state,
        sidebarOpen: action.payload
      }

    default:
      return state
  }
}

// Provider component
export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  // Load conversations from localStorage on mount
  useEffect(() => {
    const savedConversations = loadFromLocalStorage('chatgpt-conversations', [])
    const savedCurrentId = loadFromLocalStorage('chatgpt-current-conversation', null)
    const savedSidebarState = loadFromLocalStorage('chatgpt-sidebar-open', true)

    if (savedConversations.length > 0) {
      dispatch({ type: ACTIONS.SET_CONVERSATIONS, payload: savedConversations })
    }

    if (savedCurrentId) {
      dispatch({ type: ACTIONS.SET_CURRENT_CONVERSATION, payload: savedCurrentId })
    }

    dispatch({ type: ACTIONS.SET_SIDEBAR_OPEN, payload: savedSidebarState })
  }, [])

  // Save to localStorage whenever conversations change
  useEffect(() => {
    if (state.conversations.length > 0) {
      saveToLocalStorage('chatgpt-conversations', state.conversations)
    }
  }, [state.conversations])

  // Save current conversation ID
  useEffect(() => {
    if (state.currentConversationId) {
      saveToLocalStorage('chatgpt-current-conversation', state.currentConversationId)
    }
  }, [state.currentConversationId])

  // Save sidebar state
  useEffect(() => {
    saveToLocalStorage('chatgpt-sidebar-open', state.sidebarOpen)
  }, [state.sidebarOpen])

  // Action creators
  const actions = {
    createNewConversation: () => {
      const newConversation = {
        id: generateId(),
        title: 'New Chat',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      dispatch({ type: ACTIONS.ADD_CONVERSATION, payload: newConversation })
      return newConversation.id
    },

    deleteConversation: (conversationId) => {
      dispatch({ type: ACTIONS.DELETE_CONVERSATION, payload: conversationId })
    },

    setCurrentConversation: (conversationId) => {
      dispatch({ type: ACTIONS.SET_CURRENT_CONVERSATION, payload: conversationId })
    },

    addMessage: (conversationId, message) => {
      const messageWithId = {
        ...message,
        id: generateId(),
        timestamp: new Date().toISOString()
      }

      dispatch({
        type: ACTIONS.ADD_MESSAGE,
        payload: { conversationId, message: messageWithId }
      })

      // Update conversation title if this is the first user message
      const conversation = state.conversations.find(c => c.id === conversationId)
      if (conversation && conversation.messages.length === 0 && message.role === 'user') {
        const title = generateConversationTitle(message.content)
        dispatch({
          type: ACTIONS.UPDATE_CONVERSATION,
          payload: { id: conversationId, updates: { title } }
        })
      }

      return messageWithId.id
    },

    updateMessage: (conversationId, messageId, updates) => {
      dispatch({
        type: ACTIONS.UPDATE_MESSAGE,
        payload: { conversationId, messageId, updates }
      })
    },

    deleteMessage: (conversationId, messageId) => {
      dispatch({
        type: ACTIONS.DELETE_MESSAGE,
        payload: { conversationId, messageId }
      })
    },

    setIsTyping: (isTyping) => {
      dispatch({ type: ACTIONS.SET_IS_TYPING, payload: isTyping })
    },

    setGenerationController: (controller) => {
      dispatch({ type: ACTIONS.SET_GENERATION_CONTROLLER, payload: controller })
    },

    setCanRegenerate: (canRegenerate) => {
      dispatch({ type: ACTIONS.SET_CAN_REGENERATE, payload: canRegenerate })
    },

    stopGeneration: () => {
      if (state.generationController) {
        state.generationController.abort()
        dispatch({ type: ACTIONS.SET_GENERATION_CONTROLLER, payload: null })
        dispatch({ type: ACTIONS.SET_IS_TYPING, payload: false })
      }
    },

    toggleSidebar: () => {
      dispatch({ type: ACTIONS.SET_SIDEBAR_OPEN, payload: !state.sidebarOpen })
    },

    setSidebarOpen: (open) => {
      dispatch({ type: ACTIONS.SET_SIDEBAR_OPEN, payload: open })
    }
  }

  const value = {
    ...state,
    ...actions,
    currentConversation: state.conversations.find(c => c.id === state.currentConversationId) || null
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

// Hook to use the chat context
export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

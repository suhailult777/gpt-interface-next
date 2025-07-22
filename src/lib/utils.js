import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

// Theme utilities
export const getSystemTheme = () => {
    if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
}

export const setTheme = (theme) => {
    if (typeof window !== 'undefined') {
        const root = document.documentElement
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark')
        } else {
            root.removeAttribute('data-theme')
        }
        localStorage.setItem('theme', theme)
    }
}

export const getStoredTheme = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('theme') || 'system'
    }
    return 'system'
}

// Message utilities
export const generateId = () => {
    return Math.random().toString(36).substring(2, 11)
}

export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 1) {
        return 'Just now'
    } else if (diffInHours < 24) {
        return `${Math.floor(diffInHours)}h ago`
    } else if (diffInHours < 168) { // 7 days
        return `${Math.floor(diffInHours / 24)}d ago`
    } else {
        return date.toLocaleDateString()
    }
}

export const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
}

// Conversation utilities
export const generateConversationTitle = (firstMessage) => {
    if (!firstMessage) return 'New Chat'

    // Remove markdown and clean up the text
    const cleanText = firstMessage
        .replace(/[#*`_~]/g, '') // Remove markdown characters
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim()

    return truncateText(cleanText, 40)
}

// Local storage utilities
export const saveToLocalStorage = (key, data) => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(key, JSON.stringify(data))
        } catch (error) {
            console.error('Failed to save to localStorage:', error)
        }
    }
}

export const loadFromLocalStorage = (key, defaultValue = null) => {
    if (typeof window !== 'undefined') {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : defaultValue
        } catch (error) {
            console.error('Failed to load from localStorage:', error)
            return defaultValue
        }
    }
    return defaultValue
}

// Keyboard utilities
export const isModifierKey = (event) => {
    return event.ctrlKey || event.metaKey || event.altKey
}

export const handleKeyboardShortcut = (event, shortcuts) => {
    const key = event.key.toLowerCase()
    const modifiers = {
        ctrl: event.ctrlKey,
        meta: event.metaKey,
        alt: event.altKey,
        shift: event.shiftKey
    }

    for (const shortcut of shortcuts) {
        if (shortcut.key === key &&
            shortcut.ctrl === modifiers.ctrl &&
            shortcut.meta === modifiers.meta &&
            shortcut.alt === modifiers.alt &&
            shortcut.shift === modifiers.shift) {
            event.preventDefault()
            shortcut.action()
            return true
        }
    }
    return false
}

// Text processing utilities
export const copyToClipboard = async (text) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(text)
            return true
        } catch (error) {
            console.error('Failed to copy to clipboard:', error)
            return false
        }
    }
    return false
}

// Animation utilities
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const typewriterEffect = async (text, callback, speed = 30, abortSignal = null) => {
    for (let i = 0; i <= text.length; i++) {
        // Check if operation was aborted
        if (abortSignal?.aborted) {
            throw new DOMException('Operation was aborted', 'AbortError')
        }

        callback(text.substring(0, i))
        await sleep(speed)
    }
}
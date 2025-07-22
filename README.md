# ChatGPT Clone - Client Application

This is the frontend client for the ChatGPT Clone, built with Next.js 15.4.2 and featuring modern chat interface components with advanced response controls.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Dependencies

### Core Framework

- **Next.js 15.4.2** - React framework with App Router
- **React 19.1.0** - UI library
- **React DOM 19.1.0** - DOM bindings

### UI & Styling

- **Tailwind CSS 4.0** - Utility-first CSS framework
- **@tailwindcss/postcss** - PostCSS integration
- **tailwind-merge** - Utility for merging Tailwind classes
- **class-variance-authority** - Component variant management
- **clsx** - Conditional class names

### UI Components

- **@radix-ui/react-dialog** - Modal dialogs
- **@radix-ui/react-separator** - Visual separators
- **@radix-ui/react-slot** - Composition utilities
- **lucide-react** - Icon library

### Content & Markdown

- **react-markdown** - Markdown rendering
- **react-syntax-highlighter** - Code syntax highlighting
- **@types/react-syntax-highlighter** - TypeScript definitions

### Development Tools

- **ESLint** - Code linting
- **eslint-config-next** - Next.js ESLint configuration

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Alternative package managers
yarn dev / pnpm dev  # Development with yarn/pnpm
```

## 🏗️ Project Architecture

### Component Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout with providers
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── chat/              # Chat-specific components
│   │   ├── ChatInterface.js    # Main chat container
│   │   ├── ChatMessages.js     # Message list
│   │   ├── MessageBubble.js    # Individual message
│   │   ├── ResponseControls.js # Response control buttons
│   │   ├── ChatInput.js        # Message input field
│   │   ├── ChatHeader.js       # Chat header
│   │   └── WelcomeScreen.js    # Landing screen
│   └── ui/                # Reusable UI components
│       ├── Button.js           # Enhanced button
│       ├── Badge.js            # Status badges
│       ├── Avatar.js           # User avatars
│       ├── IconButton.js       # Icon buttons
│       ├── Input.js            # Input fields
│       ├── Textarea.js         # Text areas
│       ├── LoadingSpinner.js   # Loading indicators
│       └── KeyboardShortcuts.js # Keyboard handling
├── contexts/
│   ├── ChatContext.js     # Chat state management
│   └── ThemeContext.js    # Theme management
├── lib/
│   └── utils.js           # Utility functions
└── styles/                # Additional styles
```

### Key Features Implemented

- **Response Controls**: Regenerate and stop generation buttons
- **Modern UI**: shadcn/ui inspired components
- **Responsive Design**: Mobile-first approach
- **State Management**: Context-based chat state
- **Theme Support**: Dark/light mode switching
- **Markdown Support**: Rich text rendering with syntax highlighting
- **Accessibility**: ARIA labels and keyboard navigation

## 🎨 Styling System

### Tailwind Configuration

- Custom color palette for chat interface
- Dark mode support with `class` strategy
- Custom animations and transitions
- Responsive breakpoints
- Component-specific utilities

### Design Tokens

```css
/* Custom CSS variables in globals.css */
--color-background
--color-foreground
--color-primary
--color-sidebar-bg
--color-user-message
--color-assistant-message
/* ... and more */
```

## 🔧 Configuration Files

- **`next.config.mjs`** - Next.js configuration
- **`tailwind.config.js`** - Tailwind CSS setup
- **`postcss.config.mjs`** - PostCSS configuration
- **`eslint.config.mjs`** - ESLint rules
- **`jsconfig.json`** - JavaScript/TypeScript paths

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy on Vercel

The easiest deployment option:

1. Push to GitHub repository
2. Connect to [Vercel](https://vercel.com)
3. Deploy automatically on push

### Other Deployment Options

- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment

## 🐛 Development Notes

### Hot Reload

The development server uses Turbopack for fast hot reloading. Changes to components will reflect immediately.

### State Management

- Chat state is managed via React Context
- Local storage persistence for conversations
- Optimistic UI updates for better UX

### Performance

- Code splitting with Next.js dynamic imports
- Optimized images and fonts
- Minimal bundle size with tree shaking

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

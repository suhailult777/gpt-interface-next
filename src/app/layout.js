import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/contexts/ChatContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ChatGPT Clone",
  description: "A complete ChatGPT clone built with Next.js and React featuring real-time messaging, markdown support, and responsive design",
  keywords: "ChatGPT, AI, Chat, React, Next.js, OpenAI",
  authors: [{ name: "ChatGPT Clone" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10a37f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { Message } from "../types/Chat";

interface ChatContextType {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    isTyping: boolean;
    setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    chatEndRef: React.RefObject<HTMLDivElement>;
    formatResponse: (response: any) => string;
}

export const ChatContext = createContext<ChatContextType | undefined>(
    undefined
);

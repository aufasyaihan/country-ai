import { useEffect, useRef, useState } from "react";
import { Message } from "../types/Chat";
import { ChatContext } from "../contexts/ChatContext";

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const formatResponse = (text: string) => {
        return text
            .replace(/\n/g, "<br />")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    };

    return (
        <ChatContext.Provider value={{ messages, setMessages, input, setInput, isTyping, setIsTyping, error, setError, chatEndRef, formatResponse }}>
          {children}
        </ChatContext.Provider>
      );
};

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { IoMdSend } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";

interface Message {
    sender: string;
    text: string;
}

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const response = await axios.post(
                proxyUrl + import.meta.env.VITE_NVIDIA_NIM_ENDPOINT,
                {
                    message: input,
                    context: "travel",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                            import.meta.env.VITE_NVIDIA_NIM_API_KEY
                        }`,
                    },
                }
            );

            setMessages((prev) => [
                ...prev,
                { sender: "ai", text: response.data.reply },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { sender: "ai", text: (error as Error).message },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <Card>
            <div className="flex flex-col h-[500px] w-full overflow-y-auto">
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-2xl font-bold">Chat with AI</h1>
                    <hr className="w-full" />
                </div>
                <div className="flex flex-col gap-2 p-2 flex-grow overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-lg w-fit max-w-[75%] ${
                                msg.sender === "user"
                                    ? "bg-slate-900 text-white self-end"
                                    : "bg-gray-200 text-black self-start"
                            }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    {isTyping && (
                        <p className="text-gray-500">
                            <AiOutlineLoading className="animate-spin duration-initial text-3xl" />
                        </p>
                    )}
                    <div ref={chatEndRef} />
                </div>
                <div className="flex gap-2 mt-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask something about this country..."
                        className="flex-grow p-2 border rounded-lg"
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        disabled={isTyping}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isTyping}
                        className="flex items-center justify-center bg-slate-900 w-10 h-full text-white p-2 rounded-lg"
                    >
                        <IoMdSend />
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default Chat;

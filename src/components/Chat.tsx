import axios from "axios";
import Card from "./Card";
import { IoMdSend } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY_BY_CODE } from "../api/client";
import { MdError } from "react-icons/md";
import { ChatContext } from "../contexts/ChatContext";
import { useContext, useEffect } from "react";
import Option from "./Option";

const Chat = () => {
    const { countryId } = useParams<{ countryId: string }>();
    const { data } = useQuery(GET_COUNTRY_BY_CODE, {
        variables: { code: countryId },
    });
    const chatContext = useContext(ChatContext);
    if (!chatContext) {
        throw new Error("ChatContext must be used within a ChatProvider");
    }
    const {
        setMessages,
        setInput,
        setError,
        setIsTyping,
        messages,
        formatResponse,
        error,
        input,
        isTyping,
        chatEndRef,
    } = chatContext;

    useEffect(() => {
        setMessages([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sendMessage = async (input: string) => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setError(null);
        setIsTyping(true);

        try {
            const context = data!.country;
            const response = await axios.post(
                import.meta.env.VITE_CHAT_API_URL,
                {
                    messages: [...messages, userMessage],
                    context,
                }
            );

            const formattedResponse = formatResponse(response.data.response);

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: formattedResponse },
            ]);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <Card>
            <div className="flex flex-col gap-2 h-[500px] w-full overflow-y-auto">
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-lg sm:text-2xl font-bold">Chat with AI</h1>
                    <hr className="w-full" />
                </div>
                <div className="flex flex-col gap-2 p-2 flex-grow overflow-y-auto">
                    {messages.length === 0 && (
                        <div className="flex flex-col gap-2 w-full sm:w-3/4 md:w-full lg:w-3/4 bg-slate-900 p-4 rounded text-white shadow-md">
                            <h3 className="sm:text-lg">Ask Something!</h3>
                            <div className="flex flex-col gap-2 w-full lg:w-3/4">
                                <Option
                                    message="What do you know about this country?"
                                    sendMessage={sendMessage}
                                />
                                <Option
                                    message="Get travel recommendations"
                                    sendMessage={sendMessage}
                                />
                                <Option
                                    message="Translate country information"
                                    sendMessage={sendMessage}
                                />
                            </div>
                        </div>
                    )}
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-lg w-fit max-w-[75%] ${
                                msg.role === "user"
                                    ? "bg-slate-900 text-white self-end"
                                    : "bg-gray-200 text-black self-start"
                            }`}
                        >
                            <div className="text-xs"
                                dangerouslySetInnerHTML={{
                                    __html: msg.content,
                                }}
                            />
                        </div>
                    ))}
                    {error && (
                        <div className="bg-red-200 p-2 rounded-lg w-fit max-w-[75%]">
                            <p className="flex gap-2 items-center text-red-800 p-2">
                                <span>
                                    <MdError />
                                </span>
                                {error}
                            </p>
                        </div>
                    )}
                    {isTyping && (
                        <p className="text-slate-900 bg-gray-200 p-2 rounded-lg w-fit max-w-[75%]">
                            <AiOutlineLoading className="animate-spin duration-initial text-2xl" />
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
                        className="flex-grow p-2 border rounded-lg w-1/2 sm:w-full"
                        onKeyDown={(e) =>
                            e.key === "Enter" && sendMessage(input)
                        }
                        disabled={isTyping}
                    />
                    <button
                        onClick={() => sendMessage(input)}
                        disabled={isTyping}
                        className="flex items-center justify-center bg-slate-900 w-10 h-full text-white p-2 rounded-lg disabled:bg-slate-400 disabled:cursor-not-allowed cursor-pointer hover:bg-slate-800 transition-all duration-200"
                    >
                        <IoMdSend />
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default Chat;

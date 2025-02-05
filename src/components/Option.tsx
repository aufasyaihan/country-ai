interface OptionProps {
    sendMessage: (input: string) => void;
    message: string;
}

const Option: React.FC<OptionProps> = ({ sendMessage, message }: OptionProps) => {
    return (
        <button
            className="border border-slate-400 bg-slate-800 p-2 rounded hover:bg-slate-700 cursor-pointer transition-all duration-200 text-xs sm:text-sm w-full break-words whitespace-normal"
            onClick={() => sendMessage(message)}
        >
            {message}
        </button>
    );
};

export default Option;

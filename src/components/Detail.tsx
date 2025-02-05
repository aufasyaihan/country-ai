import { useState } from "react";

interface DetailProps {
    title: string;
    value?: string;
    data?: { name: string }[];
}

const MAX_WORDS = 100;

const Detail: React.FC<DetailProps> = ({ title, value, data }) => {
    const [show, setShow] = useState(false);

    if (value) {
      const formatValue = value.split(',').join(', ');
        return (
            <div>
                <h2 className="font-semibold sm:text-xl">{title}</h2>
                <p className="font-light">{formatValue}</p>
            </div>
        );
    }

    if (data && data.length > 0) {
        const fullText = data.map((item) => item.name).join(", ");
        const shortenedText = fullText.length > MAX_WORDS && !show ? fullText.slice(0, MAX_WORDS) + "..." : fullText;

        return (
            <div>
                <h2 className="font-semibold sm:text-xl">{title}</h2>
                <p className="font-light">
                    {shortenedText}{" "}
                    {fullText.length > MAX_WORDS && (
                        <button className="font-bold cursor-pointer" onClick={() => setShow(!show)}>
                            {show ? "Show Less" : "Show More"}
                        </button>
                    )}
                </p>
            </div>
        );
    }

    return null;
};

export default Detail;

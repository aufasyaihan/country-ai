import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router";
import Country from "../components/Country";
import Chat from "../components/Chat";

const DetailCountry: React.FC = () => {
    return (
        <section className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl sm:text-3xl flex items-center gap-2">
                <Link to="/">
                    <IoChevronBackOutline />
                </Link>
                Detail Country
            </h1>
            <div className="flex flex-wrap md:flex-nowrap gap-2 w-full">
                <Country />
                <Chat />
            </div>
        </section>
    );
};

export default DetailCountry;

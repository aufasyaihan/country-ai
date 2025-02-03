import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router";
import Country from "../components/Country";

const DetailCountry: React.FC = () => {
    

    return (
        <section className="flex flex-col gap-4 w-full">
            <div className="text-3xl flex items-center gap-2">
                {" "}
                <Link to="/">
                    <IoChevronBackOutline />
                </Link>
                <h1>Detail Country</h1>
            </div>
            <div className=" flex gap-2 w-full">
                <Country />
                <div className="w-1/2">chat</div>
            </div>
        </section>
    );
};

export default DetailCountry;

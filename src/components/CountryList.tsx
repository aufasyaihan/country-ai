import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { CountryType } from "../types/Country";
import { GET_COUNTRIES } from "../api/client";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";

const CountryList: React.FC = () => {
    const { loading, error, data } = useQuery(GET_COUNTRIES);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const itemsPerPage = 16;

    useEffect(() => {
        if (!searchParams.get("page")) {
            setSearchParams({ page: "1" });
        }
    }, [searchParams, setSearchParams]);

    if (loading)
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[530px] w-full">
                    {Array.from({ length: 16 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-gray-300 rounded-md animate-pulse"
                        ></div>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    <div className="bg-gray-300 w-24 h-10 rounded-md animate-pulse"></div>
                    <div className="flex gap-2 items-center">
                        <div className="bg-gray-300 w-10 h-10 rounded-md animate-pulse"></div>
                        <div className="bg-gray-300 w-10 h-10 rounded-md animate-pulse"></div>
                    </div>
                </div>
            </>
        );
    if (error)
        return (
            <div className="bg-red-200 border-l-4 border-red-400 w-full rounded-sm">
                <p className="flex gap-2 items-center text-red-800 p-2">
                    <span>
                        <MdError />
                    </span>
                    {error.message}
                </p>
            </div>
        );

    const totalPages = Math.ceil(data.countries.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedCountries = data.countries.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: newPage.toString() });
    };

    return (
        <section className="flex flex-col w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[530px] w-full">
                {selectedCountries.map((country: CountryType) => (
                    <Link
                        to={`${country.code}`}
                        className="bg-white p-4 shadow-sm w-full rounded-md cursor-pointer relative overflow-hidden group"
                        key={country.code}
                    >
                        <h2 className="flex items-center gap-2 text-xl z-10 group-hover:text-white relative transition-all duration-300 ease-in-out">
                            {country.name}{" "}
                            <span className="text-gray-400">
                                <ReactCountryFlag
                                    className="mb-1"
                                    countryCode={country.code}
                                    svg
                                />
                            </span>
                        </h2>
                        <div className="text-gray-600 font-light z-10 relative group-hover:text-gray-200 transition-all duration-300 ease-in-out">
                            <p>Capital: {country.capital}</p>
                            <p>Currency: {country.currency}</p>
                        </div>
                        <span className="bg-slate-900 w-10 h-10 group-hover:scale-[2100%] absolute -bottom-10 left-0 transition-all duration-300 ease-in -z-0 rounded-full"></span>
                    </Link>
                ))}
            </div>
            <div className="flex justify-between items-center mt-4 gap-2">
                <p className="px-4 py-2">
                    Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                    <button
                        className="p-2 bg-slate-900 rounded-md disabled:opacity-50 cursor-pointer"
                        onClick={() =>
                            handlePageChange(Math.max(currentPage - 1, 1))
                        }
                        disabled={currentPage === 1}
                    >
                        <IoChevronBackOutline className="text-white" />
                    </button>
                    <button
                        className="p-2 bg-slate-900 rounded-md disabled:opacity-50 cursor-pointer"
                        onClick={() =>
                            handlePageChange(
                                Math.min(currentPage + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                    >
                        <IoChevronForwardOutline className="text-white" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CountryList;

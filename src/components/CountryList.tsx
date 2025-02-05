import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { CountryType } from "../types/Country";
import { GET_COUNTRIES } from "../api/client";
import { MdError } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

const CountryList: React.FC = () => {
    const { loading, error, data } = useQuery(GET_COUNTRIES);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const [itemsPerPage, setItemsPerPage] = useState(16);
    const [search, setSearch] = useState<string>(
        searchParams.get("keyword") || ""
    );
    const keyword = searchParams.get("keyword");

    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth <= 768) {
                setItemsPerPage(6);
            } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
                setItemsPerPage(10);
            } else {
                setItemsPerPage(16);
            }
        };

        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);

        return () => {
            window.removeEventListener("resize", updateItemsPerPage);
        };
    }, []);

    useEffect(() => {
        if (!searchParams.get("page")) {
            setSearchParams({ page: "1" });
        }
    }, [searchParams, setSearchParams]);

    if (loading)
        return (
            <>
                <div className="flex justify-end">
                    <div className="bg-gray-300 rounded-md h-10 w-64 animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:h-[530px] w-full">
                    {Array.from({ length: itemsPerPage }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-gray-300 rounded-md h-26 animate-pulse"
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

    const filteredData = data.countries.filter((country: CountryType) => {
        if (!keyword) return true;
        return country.name?.toLowerCase().includes(keyword.toLowerCase());
    });
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedCountries = filteredData.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <section className="flex flex-col gap-2 w-full">
            <div className="flex justify-end">
                <SearchBar
                    search={search}
                    searchParams={searchParams}
                    setSearch={setSearch}
                    setSearchParams={setSearchParams}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-6 md:grid-rows-5 lg:grid-cols-4 lg:grid-rows-4 gap-4 h-[700px] lg:h-[530px] w-full">
                {selectedCountries.map((country: CountryType) => (
                    <Link
                        to={`${country.code}`}
                        className="bg-white p-4 shadow-sm w-full rounded-md cursor-pointer relative overflow-hidden group"
                        key={country.code}
                    >
                        <h2 className="flex items-center gap-2 text-xl z-10 group-hover:text-white relative transition-all duration-300 ease-in-out">
                            <span className="text-gray-400">
                                <ReactCountryFlag
                                    className="mb-1"
                                    countryCode={country.code}
                                    svg
                                />
                            </span>
                            {country.name?.split("").length > 16
                                ? country.name.slice(0, 16) + "..."
                                : country.name}
                        </h2>
                        <div className="text-gray-600 font-light z-10 relative group-hover:text-gray-200 transition-all duration-300 ease-in-out">
                            {country.capital && <p>Capital: {country.capital}</p>}
                            {country.currency && <p>
                                Currency:{" "}
                                {country.currency
                                    ?.split(",")
                                    .map((curr) => curr.trim())
                                    .join(", ")
                                    .slice(0, 15) +
                                    (country.currency?.length > 15
                                        ? "..."
                                        : "")}
                            </p>}
                        </div>
                        <span className="bg-slate-900 w-10 h-10 group-hover:scale-[2700%] sm:group-hover:scale-[3550%] md:group-hover:scale-[2350%] lg:group-hover:scale-[2100%] absolute -bottom-10 left-0 transition-all duration-300 ease-in -z-0 rounded-full"></span>
                    </Link>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                setSearchParams={setSearchParams}
                totalPages={totalPages}
            />
        </section>
    );
};

export default CountryList;

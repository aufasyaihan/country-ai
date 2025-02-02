import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { CountryType } from "../types/Country";
import { GET_COUNTRIES } from "../api/client";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

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
        <div className="flex flex-col w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[530px] w-full">
                {selectedCountries.map((country: CountryType) => (
                    <div
                        className="bg-white p-4 shadow-sm w-full rounded-md cursor-pointer"
                        key={country.name}
                    >
                        <h2 className="text-xl">
                            {country.name}{" "}
                            <span className="text-gray-400">
                                {country.emoji}
                            </span>
                        </h2>
                        <div className="text-gray-600 font-light">
                            <p>Capital: {country.capital}</p>
                            <p>Currency: {country.currency}</p>
                        </div>
                    </div>
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
        </div>
    );
};

export default CountryList;

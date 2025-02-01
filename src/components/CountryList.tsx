import { useQuery } from "@apollo/client";
import { CountryType } from "../types/Country";
import { GET_COUNTRIES } from "../api/client";

const CountryList: React.FC = () => {
    const { loading, error, data } = useQuery(GET_COUNTRIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            {data.countries.map((country: CountryType) => (
                <div
                    className=" bg-white p-4 shadow-sm w-full rounded-md"
                    key={country.name}
                >
                    <h2 className="text-xl">
                        {country.name}{" "}
                        <span className="text-gray-400">{country.emoji}</span>
                    </h2>
                    <div className="text-gray-600 font-light">
                        <p>Capital: {country.capital}</p>
                        <p>Currency: {country.currency}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CountryList;

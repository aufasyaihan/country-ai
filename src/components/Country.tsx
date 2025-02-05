import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { GET_COUNTRY_BY_CODE } from "../api/client";
import Card from "./Card";
import { MdError } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";

interface Language {
    name: string;
}

const Country: React.FC = () => {
    const { countryId } = useParams<{ countryId: string }>();
    const { loading, error, data } = useQuery(GET_COUNTRY_BY_CODE, {
        variables: { code: countryId },
    });

    return (
        <Card>
            {error && (
                <div className="bg-red-200 border-l-4 border-red-400 w-full rounded-sm">
                    <p className="flex gap-2 items-center text-red-800 p-2">
                        <span>
                            <MdError />
                        </span>
                        {error.message}
                    </p>
                </div>
            )}
            {loading &&
                Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="w-full bg-gray-300 h-10 animate-pulse rounded"
                    ></div>
                ))}
            {data?.country && (
                <>
                    <div className="flex flex-col gap-2">
                        <h1 className="flex gap-2 text-lg sm:text-2xl font-bold">
                            <span className="text-gray-400">
                                <ReactCountryFlag
                                    className="mb-1"
                                    countryCode={data.country.code}
                                    svg
                                />
                            </span>
                            {data.country.name}
                        </h1>
                        <hr className="w-full" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>
                            <h2 className="font-semibold sm:text-xl">Capital</h2>
                            <p className="font-light">
                                {" "}
                                {data.country.capital}
                            </p>
                        </div>
                        <div>
                            <h2 className="font-semibold sm:text-xl">Currency</h2>
                            <p className="font-light">
                                {" "}
                                {data.country.currency}
                            </p>
                        </div>
                        <div>
                            <h2 className="font-semibold sm:text-xl">Continent</h2>
                            <p className="font-light">
                                {" "}
                                {data.country.continent.name}
                            </p>
                        </div>
                        <div>
                            <h2 className="font-semibold sm:text-xl">
                                Language
                                {data.country.languages.length > 1 && "s"}
                            </h2>
                            <p className="font-light">
                                {" "}
                                {data.country.languages
                                    .map((lang: Language) => lang.name)
                                    .join(", ")}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </Card>
    );
};

export default Country;

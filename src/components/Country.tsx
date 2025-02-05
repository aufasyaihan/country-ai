import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { GET_COUNTRY_BY_CODE } from "../api/client";
import Card from "./Card";
import { MdError } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";
import { getRegion, isPlural } from "../lib/utils";
import Detail from "./Detail";

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
                        {data.country.capital && (
                            <Detail
                                title="Capital"
                                value={data.country.capital}
                            />
                        )}
                        {data.country.currency && (
                            <Detail
                                title="Currency"
                                value={data.country.currency}
                            />
                        )}
                        {data.country.continent && (
                            <Detail
                                title="Continent"
                                value={data.country.continent.name}
                            />
                        )}
                        {data.country.languages.length > 0 && (
                            <Detail
                                data={data.country.languages}
                                title={`Language${isPlural(
                                    data.country.languages
                                )}`}
                            />
                        )}
                        {data.country.native && (
                            <Detail
                                title="Native"
                                value={data.country.native}
                            />
                        )}
                        {data.country.awsRegion && (
                            <Detail
                                title="AWS Region"
                                value={getRegion(data.country.awsRegion)}
                            />
                        )}
                        {data.country.phone && (
                            <Detail
                                title="Phone Code"
                                value={`+${data.country.phone}`}
                            />
                        )}
                        {data.country.states.length > 0 && (
                            <div>
                                <Detail
                                    data={data.country.states}
                                    title={`State${isPlural(
                                        data.country.languages
                                    )}`}
                                />
                            </div>
                        )}
                        {data.country.subdivisions.length > 0 && (
                            <div>
                                <Detail
                                    data={data.country.subdivisions}
                                    title={`Subdivision${isPlural(
                                        data.country.languages
                                    )}`}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </Card>
    );
};

export default Country;

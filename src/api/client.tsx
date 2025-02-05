import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
});

export const GET_COUNTRIES = gql`
    query GetCountries {
        countries {
            code
            name
            emoji
            capital
            currency
        }
    }
`;

export const GET_COUNTRY_BY_CODE = gql`
    query GetCountryByCode($code: ID!) {
        country(code: $code) {
            code
            name
            emoji
            capital
            currency
            awsRegion
            native
            phone
            states {
                name
            }
            subdivisions {
                name
            }
            continent {
                name
            }
            languages {
                name
            }
        }
    }
`;

export default client;

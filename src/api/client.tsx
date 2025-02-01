import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://countries.trevorblades.com/",
    cache: new InMemoryCache(),
});

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      emoji
      capital
      currency
    }
  }
`;

export default client;
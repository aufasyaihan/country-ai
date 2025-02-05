export interface CountryType {
    code: string;
    name: string;
    emoji: string;
    capital: string;
    currency: string;
    awsRegion?: string;
    native?: string;
    phone?: string;
    states?: { name: string }[];
    subdivisions?: { name: string }[];
    continent?: { name: string };
    languages?: { name: string }[];
}

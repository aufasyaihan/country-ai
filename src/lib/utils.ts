import { CountryType } from "../types/Country";
import { awsRegion } from "./awsRegion";

export function getToken(): string | null {
    const token = localStorage.getItem("token");
    return token;
}

export function debounce(fn: (e: string) => void, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    return (e: string) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(e), delay);
    };
}

export function getRegion(regionCode: string): string | undefined {
    return awsRegion[regionCode];
}

export function isPlural(data: CountryType[]): string {
    return data.length > 1 ? "s" : "";
}

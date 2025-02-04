import { IoIosSearch } from "react-icons/io";
import { debounce } from "../lib/utils";

interface SearchBarProps {
    search: string;
    setSearchParams: (search: URLSearchParams, options?: { replace: boolean }) => void;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    searchParams: URLSearchParams;
}

const SearchBar: React.FC<SearchBarProps> = ({
    search,
    setSearchParams,
    setSearch,
    searchParams,
}) => {
    const debouncedSearch = debounce((inputValue: string) => {
        const updatedSearch = new URLSearchParams(searchParams);
        updatedSearch.set("page", "1");
        if (inputValue.length === 0) {
            updatedSearch.delete("keyword");
        } else {
            updatedSearch.set("keyword", inputValue);
        }
        setSearchParams(updatedSearch, { replace: true });
    }, 1000);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearch(inputValue);
        debouncedSearch(inputValue);
    };
    return (
        <div className="flex justify-end w-full sm:w-fit">
            <form
                className="bg-slate-900 w-full sm:w-fit flex items-center rounded-md"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    className="border p-2 rounded-s-md bg-white w-full sm:w-fit"
                    value={search}
                    onChange={onSearchChange}
                    name="search"
                    placeholder="Search..."
                />
                <button className="px-4 text-white">
                    <IoIosSearch />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;

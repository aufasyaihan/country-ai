import { useContext } from "react";
import CountryList from "../components/CountryList";
import { AuthContext } from "../contexts/AuthContext";

const Home: React.FC = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("AuthContext is undefined");
    }
    const { user } = ctx;
    return (
        <div className="flex flex-col gap-4 w-full">
            <div>
                <h1 className="text-3xl">Welcome, {user?.name || 'Guest'} to Country AI</h1>
            </div>
            <CountryList />
        </div>
    );
};

export default Home;
import { Link } from "react-router";
import logo from "../assets/country-ai-logo.svg";

const Navbar: React.FC = () => {
    return (
        <nav className="flex justify-between items-center w-full bg-slate-900 px-8 py-2 shadow-md">
            <div>
                <Link to="/" className="flex gap-2 items-center text-white">
                    <img src={logo} alt="Country AI" className="w-12 h-12" />
                    <h1>Country AI</h1>
                </Link>
            </div>
            <div>
              <Link to="/login" className="bg-white px-3 py-2 rounded-md hover:bg-gray-200 text-slate-900">Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;

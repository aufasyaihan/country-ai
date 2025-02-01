import { Link, useNavigate } from "react-router";
import logo from "../assets/country-ai-logo.svg";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoExitOutline } from "react-icons/io5";

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("AuthContext is undefined");
    }
    const { user, logout } = ctx;

    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <nav className="flex justify-between items-center w-full bg-slate-900 px-8 py-2 shadow-md">
            <div>
                <Link to="/" className="flex gap-2 items-center text-white">
                    <img src={logo} alt="Country AI" className="w-12 h-12" />
                    <h1>Country AI</h1>
                </Link>
            </div>
            {!user && (
                <Link
                    to="/login"
                    className="bg-white px-3 py-2 rounded-md hover:bg-gray-200 text-slate-900"
                >
                    Login
                </Link>
            )}
            {user && (
                <div
                    className="flex gap-2 items-center relative cursor-pointer select-none"
                    onClick={handleOpen}
                >
                    <img
                        className="w-10 h-10 rounded-full"
                        src={user?.picture}
                        alt="user profile image"
                    />
                    <RiArrowDropDownLine className="text-white text-3xl" />
                    {open && (
                        <div className="absolute top-12 right-0 w-40 bg-slate-900 text-white p-2 rounded-md shadow-md cursor-default">
                            <button
                                className="flex items-center gap-2 font-light hover:bg-slate-700 w-full cursor-pointer p-2 rounded-sm"
                                onClick={handleLogout}
                            >
                                <span>
                                    <IoExitOutline />
                                </span>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;

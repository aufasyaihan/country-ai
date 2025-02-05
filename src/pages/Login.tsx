import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { MdError } from "react-icons/md";

const Login: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("AuthContext is undefined");
    }
    const { login } = ctx;

    const handleLoginSuccess = (response: CredentialResponse) => {
        if (response.credential) {
            login(response.credential);
        } else {
            setError("Credential is undefined");
        }
        navigate("/");
    };

    const handleLoginFailure = () => {
        setError("Login failed, please try again later");
    };

    return (
        <main className="flex flex-col h-screen items-center justify-center bg-slate-900">
            <div className="flex flex-col items-center gap-4 lg:w-1/4 bg-slate-700 text-white p-4 rounded-md border border-slate-600">
                {error && (
                    <div className="bg-red-200 border-l-4 border-red-400 w-full rounded-sm">
                        <p className="flex items-center gap-2 text-red-600 capitalize p-2">
                            <span>
                                <MdError />
                            </span>
                            {error}
                        </p>
                    </div>
                )}
                <h1 className="text-2xl">Login with</h1>
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                />
            </div>
        </main>
    );
};

export default Login;

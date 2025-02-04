import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Login: React.FC = () => {
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
            console.error("Credential is undefined");
        }
        navigate("/");
    };

    const handleLoginFailure = () => {
        console.error("Login failed");
    };

    return (
        <main className="flex flex-col h-screen items-center justify-center bg-slate-900">
            <div className="flex flex-col items-center gap-4 lg:w-1/4 bg-slate-700 text-white p-4 rounded-md border border-slate-600">
                <h1 className="text-2xl ">Login with</h1>
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                />
            </div>
        </main>
    );
};

export default Login;
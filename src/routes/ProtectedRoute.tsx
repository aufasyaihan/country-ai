import { Navigate } from "react-router";
import { getToken } from "../lib/utils";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};

export default ProtectedRoute;

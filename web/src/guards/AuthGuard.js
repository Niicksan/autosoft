import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

export const AuthGuard = ({
    children,
}) => {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" />;
    }

    return children ? children : <Outlet />
};
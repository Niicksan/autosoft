import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { authServiceFactory } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();

    const authService = authServiceFactory(auth.authToken);

    const onLoginSubmit = async (loginFormData) => {
        try {
            const user = await authService.login(loginFormData);

            setAuth(user);
            navigate('/catalog/vehicles');
        } catch (error) {
            console.log('Please check your email or password', error);
        }
    }

    const onRegisterSubmit = async (registerFormData) => {
        try {
            const user = await authService.register(registerFormData);

            console.log(user)
            if (user) {
                setAuth(user);
            }

            navigate('/catalog/vehicles');
        } catch (error) {
            console.log('There is a problem', error);
        }
    }

    const onLogout = async () => {
        await authService.logout();

        setAuth({});
    };

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.authToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.authToken,
    };

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};
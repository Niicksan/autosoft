import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { authServiceFactory } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const [profileData, setProfileData] = useState({});

    const [error, setError] = useState({
        email: true,
        companyName: true,
        password: true,
        confirmPassword: true,
        isUserExist: '',
        invalidLoginData: ''
    })

    const navigate = useNavigate();

    const authService = authServiceFactory(auth.authToken);

    const onLoginSubmit = async (loginFormData) => {
        try {
            const user = await authService.login(loginFormData);

            if (user?._id) {
                setAuth(user);
                navigate('/catalog/vehicles');
            } else {
                setError({ ...error, invalidLoginData: user?.message });
            }
        } catch (err) {
            setError({ ...error, invalidLoginData: err?.message });
            console.log(error.invalidLoginData);
            console.log('Please check your email or password', err);
        }
    }

    const onRegisterSubmit = async (registerFormData) => {
        try {
            const user = await authService.register(registerFormData);

            if (user?._id) {
                setAuth(user);
                navigate('/catalog/vehicles');
            } else {
                setError({ ...error, isUserExist: user?.message });
            }
        } catch (err) {
            setError({ ...error, isUserExist: err?.message });
            console.log('There is a problem', err);
        }
    }

    const onLogout = async () => {
        await authService.logout();

        setAuth({});
    };

    const contextValues = {
        profileData,
        setProfileData,
        error,
        setError,
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
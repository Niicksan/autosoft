import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuthValidation = () => {
    const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

    const { error, setError, onLoginSubmit } = useContext(AuthContext);
    const [user, setUser] = useState({
        email: '',
        companyName: '',
        password: '',
        confirmPassword: '',
    })
    const [isLoginFormValid, setIsLoginFormValid] = useState(false);

    const checkIsLoginFormValid = () => {
        (
            (error.email && user.email !== '') &&
            (error.password && user.password !== '')
        ) ? setIsLoginFormValid(true) : setIsLoginFormValid(false);
    }

    const handleClickEmail = (e) => {
        if (emailRegex.test(e.target.value)) {
            setError({ ...error, email: true });
        } else {
            setError({ ...error, email: false });
        }

        setUser({ ...user, email: e.target.value });
    };

    const handleClickPassword = (e) => {
        if ((e.target.value).length > 4) {
            setError({ ...error, password: true });
        } else {
            setError({ ...error, password: false });
        }

        setUser({ ...user, password: e.target.value });
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return {
        error,
        user,
        isLoginFormValid,
        onLoginSubmit,
        checkIsLoginFormValid,
        handleClickEmail,
        handleClickPassword,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword
    }
} 
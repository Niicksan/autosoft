import { useState } from "react";

export const useContactsValidation = () => {
    const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

    const [isFormValid, setIsFormValid] = useState(false);
    const [isSentSuccessfully, setIsSentSuccessfully] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [error, setError] = useState({
        name: true,
        email: true,
        subject: true,
        message: true
    });

    const handleClickName = (e) => {
        if ((e.target.value).length > 1) {
            setError({ ...error, name: true });
        } else {
            setError({ ...error, name: false });
        }

        setForm({ ...form, name: e.target.value });
    };

    const handleClickEmail = (e) => {
        if (emailRegex.test(e.target.value)) {
            setError({ ...error, email: true });
        } else {
            setError({ ...error, email: false });
        }

        setForm({ ...form, email: e.target.value });
    };

    const handleClickSubject = (e) => {
        if ((e.target.value).length > 1) {
            setError({ ...error, subject: true });
        } else {
            setError({ ...error, subject: false });
        }

        setForm({ ...form, subject: e.target.value });
    };

    const handleClickMessage = (e) => {
        if ((e.target.value).length > 19) {
            setError({ ...error, message: true });
        } else {
            setError({ ...error, message: false });
        }

        setForm({ ...form, message: e.target.value });
    };

    const checkIsFormValid = () => {
        (
            (error.name && form.name !== '') &&
            (error.email && form.email !== '') &&
            (error.subject && form.subject !== '') &&
            (error.message && form.message !== '')
        ) ? setIsFormValid(true) : setIsFormValid(false);
    };

    return {
        form,
        error,
        isSentSuccessfully,
        isFormValid,
        handleClickName,
        handleClickEmail,
        handleClickSubject,
        handleClickMessage,
        checkIsFormValid
    };
};
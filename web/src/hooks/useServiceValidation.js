import { useState } from "react";
import { useServiceContext } from "../contexts/ServiceContext";

export const useServiceValidation = () => {
    const [isServiceFormValid, setIsServiceFormValid] = useState(false);
    const { error, setError, onCreateServiceSubmit, onEditServiceSubmit, getServiceById } = useServiceContext();
    const [serviceForm, setServiceForm] = useState({
        title: '',
        kilometers: '',
        description: ''
    });

    const handleClickTitle = (e) => {
        if ((e.target.value).length > 1) {
            setError({ ...error, title: true });
        } else {
            setError({ ...error, title: false });
        }

        setServiceForm({ ...serviceForm, title: e.target.value });
    };

    const handleClickKilometers = (e) => {
        if ((e.target.value).length > 0) {
            setError({ ...error, kilometers: true });
        } else {
            setError({ ...error, kilometers: false });
        }

        setServiceForm({ ...serviceForm, kilometers: e.target.value });
    };

    const handleClickDescription = (e) => {
        if ((e.target.value).length > 9) {
            setError({ ...error, description: true });
        } else {
            setError({ ...error, description: false });
        }

        setServiceForm({ ...serviceForm, description: e.target.value });
    };

    const checkIsServiceFormValid = () => {
        (
            (error.title && serviceForm.title !== '') &&
            (error.kilometers && serviceForm.kilometers !== '') &&
            (error.description && serviceForm.description !== '')
        ) ? setIsServiceFormValid(true) : setIsServiceFormValid(false);
    };

    return {
        error,
        setError,
        serviceForm,
        setServiceForm,
        isServiceFormValid,
        handleClickTitle,
        handleClickKilometers,
        handleClickDescription,
        getServiceById,
        onCreateServiceSubmit,
        onEditServiceSubmit,
        checkIsServiceFormValid
    };
};
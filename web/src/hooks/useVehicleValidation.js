import { useState } from "react";
import { useVehicleContext } from "../contexts/VehicleContext";

const fuels = [
    {
        value: 'Бензин',
        label: 'Бензин',
    },
    {
        value: 'Дизел',
        label: 'Дизел',
    },
    {
        value: 'Хибрид',
        label: 'Хибрид',
    },
    {
        value: 'Плъгин хибрид',
        label: 'Плъгин хибрид',
    },
    {
        value: 'Електрически',
        label: 'Електрически',
    }
];

const years = [];

for (let i = new Date().getFullYear(); i >= 1920; i--) {
    years.push({
        value: i,
        label: i,
    });
}

export const useVehicleValidation = () => {
    const urlRegex = new RegExp(/^https?:\/\/.+$/);

    const [isVehicleFormValid, setIsVehicleFormValid] = useState(false);
    const { error, setError, getVehicleById, onCreateVehicleSubmit, onEditVehicleSubmit } = useVehicleContext();
    const [form, setVehicleForm] = useState({
        vinNumber: '',
        make: '',
        model: '',
        engine: '',
        fuel: '',
        yearOfManufacture: '',
        imageUrl: '',
    });

    const handleClickVinNumber = (e) => {
        if ((e.target.value).length === 17) {
            setError({ ...error, vinNumber: true });
        } else {
            setError({ ...error, vinNumber: false });
        }

        setVehicleForm({ ...form, vinNumber: e.target.value });
    };

    const handleClickMake = (e) => {
        if ((e.target.value).length > 1) {
            setError({ ...error, make: true });
        } else {
            setError({ ...error, make: false });
        }

        setVehicleForm({ ...form, make: e.target.value });
    };

    const handleClickModel = (e) => {
        if ((e.target.value).length > 1) {
            setError({ ...error, model: true });
        } else {
            setError({ ...error, model: false });
        }

        setVehicleForm({ ...form, model: e.target.value });
    };

    const handleClickEngine = (e) => {
        if ((e.target.value).length > 1) {
            setError({ ...error, engine: true });
        } else {
            setError({ ...error, engine: false });
        }

        setVehicleForm({ ...form, engine: e.target.value });
    };

    const handleClickFuel = (e) => {
        if (fuels.some(x => x.value === e.target.value)) {
            setError({ ...error, fuel: true });
        } else {
            setError({ ...error, fuel: false });
        }

        setVehicleForm({ ...form, fuel: e.target.value });
    };

    const handleClickYearOfManufacture = (e) => {
        if (years.some(x => x.value === e.target.value)) {
            setError({ ...error, yearOfManufacture: true });
        } else {
            setError({ ...error, yearOfManufacture: false });
        }

        setVehicleForm({ ...form, yearOfManufacture: e.target.value });
    };

    const handleClickImageUrl = (e) => {
        if (urlRegex.test(e.target.value)) {
            setError({ ...error, imageUrl: true });
        } else {
            setError({ ...error, imageUrl: false });
        }

        setVehicleForm({ ...form, imageUrl: e.target.value });
    };

    const checkIsVehicleFormValid = () => {
        (
            (error.vinNumber && form.vinNumber !== '') &&
            (error.make && form.make !== '') &&
            (error.model && form.model !== '') &&
            (error.engine && form.engine !== '') &&
            (error.fuel && form.fuel !== '') &&
            (error.yearOfManufacture && form.yearOfManufacture !== '') &&
            (error.imageUrl && form.imageUrl !== '')
        ) ? setIsVehicleFormValid(true) : setIsVehicleFormValid(false);
    };

    return {
        fuels,
        years,
        form,
        error,
        setVehicleForm,
        isVehicleFormValid,
        handleClickVinNumber,
        handleClickMake,
        handleClickModel,
        handleClickEngine,
        handleClickFuel,
        handleClickYearOfManufacture,
        handleClickImageUrl,
        getVehicleById,
        onCreateVehicleSubmit,
        onEditVehicleSubmit,
        checkIsVehicleFormValid
    };
};
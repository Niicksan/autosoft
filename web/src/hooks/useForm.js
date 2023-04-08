import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
        // TODO: Validate newValues shape (like initialValues)

        console.log(values);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        onSubmitHandler(values);
    };

    return {
        values,
        setValues,
        changeHandler,
        onSubmit
    };
};

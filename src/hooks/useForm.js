import { useState } from 'react';
/**
 * @param {*} initialState Objeto con los valores del formulario
 * @returns Array con los valores, un inputChange y reset
 */

export const useForm = (initialState = {}) => {

    const [form, setForm] = useState(initialState);

    const reset = (newState = initialState) => setForm(newState);
    const inputChange = ({ target }) => setForm({ ...form, [target.name] : target.value });

    return [
        form,
        inputChange,
        reset
    ];
}

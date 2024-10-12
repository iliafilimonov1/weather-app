import validateForm from "../utils/validators";
import React, { useState, ChangeEvent } from "react";

// Типы для значений формы
export interface FormValues {
    login: string;
    password: string;
}

// Типы для ошибок формы
export interface FormErrors {
    login?: string | null;
    password?: string | null;
}

// Хук для управления обработки, обновления и отправки данных формы.
export function useForm(initialValues: FormValues) {
    // Начальное состояние формы
    const [formValues, setFormValues] = useState<FormValues>(initialValues);

    // Ошибки валидации
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        // Обновляем состояние формы для текущего поля
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));

        const form = event.target.closest("form");

        // Валидируем только измененное поле
        const fieldError = validateForm({ [name]: value }, form)?.[name] || null;

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: fieldError,
        }));
    };

    const resetForm = () => {
        setFormValues(initialValues);
        setFormErrors({});
    };

    return {
        formValues,
        formErrors,
        handleChange,
        resetForm,
    };
}

export default useForm;

import React, { FC, FormEvent } from "react";
import Modal from "../../ui/Modal";
import { useAuth } from "../../../hooks/useAuth";
import useForm from "../../../hooks/useForm";
import { SignInProps } from "./types";

const SignIn: FC<SignInProps> = ({ isOpen, onClose }) => {
    // Кастомный хук для обработки формы и валидации полей
    const { formValues, formErrors, handleChange, resetForm } = useForm({
        login: "",
        password: "",
    });

    // Кастомный хук для входа
    const { onLogin } = useAuth();

    // Обработчик закрытия модалки и сброса данных формы
    const handleCloseModal = () => {
        onClose && onClose();
        resetForm && resetForm();
    };

    // Обработчик отправки данных
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onLogin(formValues);
        resetForm && resetForm();
        onClose && onClose();
    };

    return (
        <Modal onClose={handleCloseModal} title="Sign In" isOpen={isOpen}>
            <form action="#" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <label htmlFor="login" className="text-sm">Your login</label>
                        <input
                            type="text"
                            name="login"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 placeholder:font-normal"
                            value={formValues?.login}
                            data-validate="text"
                            onChange={handleChange}
                            placeholder="Your login"
                            required
                        />
                        <span className="text-red-500 text-xs italic mt-2">
                            {formErrors?.login}
                        </span>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="text-sm">Email Address</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 placeholder:font-normal"
                            value={formValues?.password}
                            data-validate="password"
                            placeholder="Your password"
                            required
                        />
                        <span className="text-red-500 text-xs italic mt-2">
                            {formErrors?.password}
                        </span>
                    </div>

                    <div className="mb-4 flex justify-end">
                        <button className="border-2 border-indigo-500 bg-indigo-500 text-white font-medium py-2 px-4 rounded">
                            Submit
                        </button>
                    </div>
                </div>
            </form>

        </Modal>
    );
};

SignIn.displayName = "SignIn";

export default SignIn;

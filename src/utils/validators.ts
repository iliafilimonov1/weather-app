type Validator = (value: string) => string | null;

const validators: { [key: string]: Validator } = {
  // Текстовое поле
  text: (value: string) => {
    if (!value) return "Field is required";

    const regexText = /^[^!>?<_\-$№#@]+$/;
    if (!regexText.test(value))
      return "Text should not contain !>?<_-$№#@ symbols";

    return null;
  },

  // Почта
  email: (value: string) => {
    if (!value) return "Field is required";

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(value)) return "Invalid email";

    return null;
  },

  // Телефон
  phone: (value: string) => {
    if (!value) return "Field is required";

    const phoneRegex = /^\+?[0-9-]+$/;
    if (!phoneRegex.test(value)) return "Invalid phone number";

    return null;
  },

  // Пароль
  password: (value: string) => {
    if (!value) return "Field is required";

    if (value.length < 8) return "Password must be at least 8 characters long";

    return null;
  },

  // Числовое поле
  number: (value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return "Field is required";

    const regexNumber = /^-?\d+([.,]\d+)?$/;

    if (!regexNumber.test(trimmedValue)) {
      return "Must be a valid number without letters or special symbols";
    }

    return null;
  },
};

// Тип для данных формы
type FormData = { [key: string]: string };

// Тип для ошибок валидации
type ValidationErrors = { [key: string]: string | null };

// Функция валидации формы на основе переданных проверок
function validateForm(
  formData: FormData,
  form: HTMLFormElement | null
): ValidationErrors {
  const validationErrors: ValidationErrors = {};

  form?.querySelectorAll("[data-validate]")?.forEach((input) => {
    const formInput = input as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;

    const validationType = formInput.getAttribute(
      "data-validate"
    ) as keyof typeof validators;
    const validator = validators[validationType];

    if (validator) {
      const value = formData[formInput.name] || "";

      const errorMessage = validator(value);

      if (errorMessage) {
        validationErrors[formInput.name] = errorMessage;
      }
    }
  });

  return validationErrors;
}

export default validateForm;

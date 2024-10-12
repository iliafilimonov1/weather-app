import { useState } from "react";

// Тип для хука useDisclosure
interface UseDisclosure {
    /* Открыт/закрыт компонент */
    isOpen: boolean;
    /* Функция открытия компонента */
    onOpen: () => void;
    /* Функция закрытия компонента */
    onClose: () => void;
    /* Открываем/закрываем компонент */
    onToggle: () => void;
}

// Кастомный хук для контроля открытия/закрытия компонента
const useDisclosure = (): UseDisclosure => {
    // Компонент закрыт/открыт
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Функция открытия компонента
    const onOpen = () => setIsOpen(true);

    // Функция закрытия компонента
    const onClose = () => setIsOpen(false);

    // Функция переключения состояния компонента
    const onToggle = () => setIsOpen((prevState) => !prevState);

    return { isOpen, onOpen, onClose, onToggle };
};

export default useDisclosure;

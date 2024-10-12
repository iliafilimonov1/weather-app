import { ReactNode } from "react";

export interface ModalProps {
  /* Открыто модальное окно или нет */
  isOpen: boolean;
  /* Заголовок модального окна */
  title?: string;
  /* Функция вызываемая при закрытии модального окна */
  onClose: () => void;
  /* Дочерние элементы */
  children: ReactNode;
}

import React, { useRef, useEffect, useCallback } from "react";
import { ModalProps } from "./types";
import { createPortal } from "react-dom";
import { LiaTimesSolid } from "react-icons/lia";

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
    // Ссылка на DOM-элемент модального окна
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Обработка клика вне модального окна
    const handleOutsideClick = useCallback((event: MouseEvent) => {
        const isClickOutside = modalRef.current && !modalRef.current.contains(event.target as Node);

        if (isClickOutside) {
            onClose();
        }
    }, [onClose]);

    // Обработка нажатия клавиши Escape
    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (event?.key === "Escape") {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) return;

        document?.addEventListener("mousedown", handleOutsideClick);
        document?.addEventListener("keydown", handleKeyPress);

        return () => {
            document?.removeEventListener("mousedown", handleOutsideClick);
            document?.removeEventListener("keydown", handleKeyPress);
        };
    }, [isOpen, handleOutsideClick, handleKeyPress]);

    return (
        isOpen &&
        createPortal(
            <div className="fixed z-10 top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-70 bg-black">
                <div ref={modalRef} className="modal bg-white p-4 rounded shadow-md w-96">
                    <header className="flex justify-between mb-8">
                        {title && <h2 className="text-3xl">{title}</h2>}
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:text-gray-800 w-10 h-10 inline-flex justify-center items-center text-xl"
                        >
                            <LiaTimesSolid />
                        </button>
                    </header>
                    <main className="modal-content pt-0 pb-0">{children}</main>
                    <footer className="flex justify-end mt-4"></footer>
                </div>
            </div>,
            document.body
        )
    );
};

Modal.displayName = 'Modal';

export default Modal;
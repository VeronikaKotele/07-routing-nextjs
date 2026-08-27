'use client';

import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  const onClose = () => router.back();

  // Закриття по кліку на фон
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Перевіряємо, чи користувач клацнув саме на фон, а не на вкладений div.
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Закриття по Escape і заборона прокрутки фону
  useEffect(() => {
    // ефект із прослуховуванням події keydown
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // подію keydown підписуємо на document
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // повертаємо функцію очищення, яка видаляє обробник події при розмонтуванні компонента
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Тут рендериться переданий вміст із пропса children */}
        {children}
      </div>
    </div>,
    document.body
  );
}

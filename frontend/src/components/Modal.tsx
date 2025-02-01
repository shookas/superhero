import React from "react";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ title, open, onClose, children }) => {
  return (
    <dialog open={open}>
      <article>
        <header>
          <button
            aria-label="Close"
            rel="prev"
            onClick={() => onClose()}
          ></button>
          <p>
            <strong>{title}</strong>
          </p>
        </header>
        {children}
      </article>
    </dialog>
  );
};

export default Modal;

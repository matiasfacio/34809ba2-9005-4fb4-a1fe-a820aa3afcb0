import { ReactNode } from "react";
import "./modal.css";

export const Modal = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className="modal">
      <div className="modal__container">
        <button
          type="button"
          className="modal__container__close-icon"
          onClick={onClose}
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
};

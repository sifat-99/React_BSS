import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = "" }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      className={`modal-backdrop bg-modal-surface mx-auto my-auto rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.6)] p-4 animate-[fade-slide-up_0.3s_ease-out_forwards] backdrop:bg-[rgba(0,0,0,0.55)] open:flex open:flex-col ${className}`}
      onClose={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}

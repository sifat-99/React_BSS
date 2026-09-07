import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {
    const dialog = useRef();

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);

    return createPortal(
        <dialog
            className="backdrop:fixed backdrop:top-0 backdrop:left-0 backdrop:z-10 backdrop:w-full backdrop:h-screen backdrop:bg-black/60 min-w-[30rem] p-0 z-20 bg-[#d5c7bc] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.26)] animate-[slide-down-fade-in_0.3s_ease-out_forwards] mx-auto my-auto"
            ref={dialog}
            onClose={onClose}
        >
            {open ? children : null}
        </dialog>,
        document.getElementById('modal')
    );
}

export default Modal;

import ReactDOM from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    const handleClickOutside = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    return ReactDOM.createPortal( 
        <div className="modal-overlay" onClick={handleClickOutside}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement
    );
};

export default Modal;
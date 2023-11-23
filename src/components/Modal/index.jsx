import { createPortal } from "react-dom";
import ModalLayer from "./ModalLayer";
import "../../styles/modal.scss";

const Modal = ({ children, onClose, isOpen }) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <ModalLayer onClose={onClose}>{children}</ModalLayer>,
    document.body
  );
};

export default Modal;

import { createPortal } from "react-dom";
import ModalLayer from "./ModalLayer";
import "../../styles/modal.scss";

const Modal = ({ children, onClose }) => {
  return createPortal(
    <ModalLayer onClose={onClose}>{children}</ModalLayer>,
    document.body
  );
};

export default Modal;

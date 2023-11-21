import CloseIcon from "../Icons/Close";
import useOutsideClick from "../../hooks/useOutsideClick";

const ModalBody = ({ children, onClose }) => {
  const ref = useOutsideClick(onClose);

  return (
    <div className="modal__body" ref={ref}>
      <div className="modal__close">
        <button onClick={() => onClose()}>
          <CloseIcon />
        </button>
      </div>
      {children}
    </div>
  );
};

export default ModalBody;

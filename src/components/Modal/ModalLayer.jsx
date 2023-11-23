import { useCallback, useEffect } from "react";
import ModalBody from "./ModalBody";
import { motion } from "framer-motion";

const ModalLayer = ({ children, onClose }) => {
  const keydownHandler = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  return (
    <motion.div
      data-testid="modal"
      className="modal__layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ModalBody onClose={onClose}>{children}</ModalBody>
    </motion.div>
  );
};

export default ModalLayer;

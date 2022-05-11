import styles from "./index.module.scss";

const Modal = ({ children, onClose, ...props }) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.overlay}
        onClick={() => {
          console.log("Close");
          onClose();
        }}
      />
      <div className={styles.modal} {...props}>
        {children}
      </div>
    </div>
  );
};

export default Modal;

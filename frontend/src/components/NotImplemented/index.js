import styles from "./index.module.scss";
import Image from "next/image";

const NotImplemented = () => {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/assets/images/lazy.png"
        height="200"
        width="200"
        alt="Lazy Monkey"
      />
      <h1 className={styles.heading}>Uhh oh...</h1>
      <p className={styles.text}>
        This feature is yet to be implemented :&#40;
      </p>
      {/* Button */}
    </div>
  );
};

export default NotImplemented;

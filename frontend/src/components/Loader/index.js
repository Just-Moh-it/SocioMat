import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./index.module.scss";
import Link from "next/link";

const Loader = ({ children, showBack = false }) => {
  return (
    <AnimatePresence>
      {showBack && (
        <Link href="/" passHref>
          <a className={styles.backBtn}>
            <Image
              src="/assets/icons/filled/back-btn.svg"
              height="25"
              width="25"
            />
            <span>Home</span>
          </a>
        </Link>
      )}
      <motion.section
        className={styles.wrapper}
        initial={{ y: 10, opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.1 }}
        exit={{ y: 10, opacity: 1 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Image
          alt="image"
          height={49}
          width={250}
          src="/assets/images/logo.svg"
        />
        <div className="content">{children}</div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Loader;

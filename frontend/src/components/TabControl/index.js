import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import { convertToHyphenCase } from "../../utils/functions";

const TabControl = ({ data, title, className, ...props }) => {
  const [currentTabIdx, setCurrentIdx] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const endPath = window?.history?.state?.url?.split("/").slice(-1).join("");
    console.log("End path", window.history.state.url);
    // Set current index to endPath
  }, [router.pathname]);

  const tabSelect = (idx) => {
    setCurrentIdx(idx);
    console.log(router.pathname);
    const { pathname } = router;
    const newPathname = pathname.split("/")[1];

    const path = convertToHyphenCase(data[idx].info.text);

    window.history.pushState(null, null, `/${newPathname}/${path}`);
  };

  return (
    <motion.div className={[styles.wrapper, className].join(" ")} {...props}>
      <div className={styles.leftWrapper}>
        {title && (
          <div className={styles.header}>
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
              className={styles.title}
            >
              {title}
            </motion.h1>
            <hr />
          </div>
        )}
        <div className={styles.list}>
          {data.map(({ info: { iconUri, text, onClickOverride } }, idx) => {
            const isActive = currentTabIdx === idx;

            return (
              <motion.button
                className={[styles.item, isActive ? styles.active : ""].join(
                  " "
                )}
                onClick={onClickOverride || (() => tabSelect(idx))}
                initial={{ y: 15, opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.1,
                  ease: "easeInOut",
                  delay: 0.03 * idx,
                }}
              >
                <Image width="24" height="24" src={iconUri} />
                <h4 className={styles.text}>{text}</h4>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Right Side */}
      <div className={styles.rightWrapper}>
        {/* Content */}
        {data.filter((_, idx) => idx === currentTabIdx)[0]?.content}
      </div>
    </motion.div>
  );
};

export default TabControl;

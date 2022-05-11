import { useState } from "react";
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";

const CustomRadioList = ({
  children,
  isShowingChecks,
  borderRadius,
  labels,
  ...props
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <fieldset className={styles.wrapper}>
      {children.map(({ ele, label, outlineColor }, idx) => (
        <Element
          key={uuid()}
          className={styles.item}
          child={ele}
          label={label}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          outlineColor={outlineColor}
          setSelectedIdx={setSelectedIdx}
          selectedIdx={selectedIdx}
          idx={idx}
          borderRadius={borderRadius}
          isShowingChecks={isShowingChecks}
        />
      ))}
    </fieldset>
  );
};

// Single Radio Button
const Element = ({
  showCheckmark = false,
  name,
  child,
  label,
  outlineColor,
  setSelectedIdx,
  selectedIdx,
  idx,
  borderRadius,
  isShowingChecks,
  ...props
}) => {
  const content = (
    <motion.label {...props} style={{ cursor: "pointer" }}>
      <input
        type="radio"
        name="test"
        value="big"
        onChange={() => setSelectedIdx(idx)}
        checked={selectedIdx === idx}
      />
      <div
        className={[
          styles.child,
          isShowingChecks ? styles.isShowingChecks : "",
        ].join(" ")}
        style={{ outlineColor: outlineColor, borderRadius: borderRadius }}
      >
        {child}
      </div>
    </motion.label>
  );

  if (label) {
    return (
      <div className={styles.labelledItem}>
        {content}
        <p className={styles.label}>{label}</p>
      </div>
    );
  } else {
    return <>{content}</>;
  }
};

export default CustomRadioList;

import { useState } from "react";
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";

const CustomRadioList = ({
  children,
  isShowingChecks,
  borderRadius,
  labels,
  childProps,
  ...props
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <form {...props}>
      <fieldset className={styles.wrapper}>
        {children.map(
          ({ ele, label, outlineColor, value, defaultChecked }, idx) => (
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
              value={value}
              defaultChecked={defaultChecked}
              {...childProps}
            />
          )
        )}
      </fieldset>
    </form>
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
  value,
  isShowingChecks,
  defaultChecked,
  selected,
  ...props
}) => {
  const content = (
    <motion.label style={{ cursor: "pointer" }}>
      <input
        type="radio"
        name="test"
        value={value}
        defaultChecked={defaultChecked}
        {...props}
        onChange={() => {
          setSelectedIdx(idx);
        }}
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

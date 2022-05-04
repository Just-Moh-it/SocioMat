import { useState } from "react";
import styles from "./index.module.scss";

const Feed = ({ tabs: srcTabs, defaultValue }) => {
  const [tabs, setTabs] = useState(
    srcTabs.map((tab) => ({
      ...tab,
      isActive: defaultValue
        ? defaultValue === tab.value
        : srcTabs[0].value === tab.value,
    }))
  );

  return (
    <ul className={styles.wrapper}>
      {tabs.map(({ text, value, onClick, isActive }) => (
        <li
          role="button"
          className={[
            styles.tab,
            "text-large",
            isActive ? styles.active : "",
          ].join(" ")}
          onClick={(e) => {
            setTabs((tabs) =>
              tabs.map((tab) => ({ ...tab, isActive: tab.value === value }))
            );
            onClick({ e, value });
          }}
        >
          {text}
        </li>
      ))}
    </ul>
  );
};

export default Feed;

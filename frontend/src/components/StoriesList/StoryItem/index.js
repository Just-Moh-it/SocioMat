import styles from "./index.module.scss";
import { useState } from "react";
import Image from "next/image";
import Alert from "../../Modal";

const StoryItem = ({ id, username, avatar, seen, ...props }) => {
  const [isShowingStory, setIsShowingStory] = useState(false);

  return (
    <button
      onClick={() => {
        setIsShowingStory(true);
      }}
      className={styles.wrapper}
    >
      {/* Avatar */}
      <div className={[styles.avatar, seen ? styles.seen : ""].join(" ")}>
        <Image alt="image" src={avatar} layout="fill" />
      </div>

      {/* Username */}
      <p className={[styles.username].join(" ")}>{username}</p>

      {isShowingStory && (
        <Alert
          onClose={() => {
            console.log("Not showing");
            setIsShowingStory(false);
          }}
        >
          Story!
        </Alert>
      )}
    </button>
  );
};

const data = {};

export default StoryItem;
